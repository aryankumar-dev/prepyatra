import { asyncHandler } from "#utils/async-handler.js";
import  ApiResponse  from "#utils/api-response.js";
import  ApiError  from "#utils/api-error.js";
import { User } from "#models/user.models.js";



const registerUser = asyncHandler(async (req, res) => {

    const { email, username, password, fullName, role, courseId } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });
    if (existingUser) {
        throw new ApiError(400, "User already exists with this email or username");
    }
    // create new user
    const user = await User.create({
        email,
        username,
        password,
        fullName,
        role,
        courseId: courseId || undefined,
    });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }
    // return success response

    res.status(201).json(new ApiResponse(201, {
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            courseId: user.courseId
        }
    }, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    // check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }
    if (user.isBlocked) {
        throw new ApiError(403, "Your account has been blocked. Please apply for a review.");
    }
    // generate access token
    const accessToken = user.generateAccessToken();
    // generate refresh token
    const refreshToken = user.generateRefreshToken();
    // save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
        httpOnly: true,
  secure: true,
  sameSite: "none",
    };
    // set refresh token in cookie
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // return success response
    res.status(200).json(new ApiResponse(200, {
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            courseId: user.courseId
        },
        accessToken
        ,
        refreshToken
    }, "User logged in successfully"));

});

const logoutUser = asyncHandler(async (req, res) => {

    const userid = req.user.id;
    // find user and clear refresh token
    const user = await User.findById(userid);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.refreshToken = null;
    await user.save();
    // clear cookies    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");    
    // return success response
    res.status(200).json(new ApiResponse(200, {}, "User logged out successfully")); 



});


const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password -refreshToken');
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, { user }, "User authenticated"));
});

const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, username, email, courseId } = req.body;
    const userId = req.user.id;

    if (username || email) {
        const existingUser = await User.findOne({
            _id: { $ne: userId },
            $or: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : []),
            ],
        });
        if (existingUser) {
            throw new ApiError(400, "Username or email is already taken");
        }
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (courseId !== undefined) user.courseId = courseId || null;
    await user.save();

    const updatedUser = await User.findById(userId).select('-password -refreshToken');
    res.status(200).json(new ApiResponse(200, { user: updatedUser }, "Profile updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
    changePassword
};