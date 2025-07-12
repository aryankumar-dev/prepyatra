import { asyncHandler } from "../utils/async-handler.js";
import  ApiResponse  from "../utils/api-response.js";
import  ApiError  from "../utils/api-error.js";
import { User } from "../models/user.models.js";



const registerUser = asyncHandler(async (req, res) => {

    const { email, username, password, fullName } = req.body;

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
        fullName
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
            fullName: user.fullName
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
    // generate access token
    const accessToken = user.generateAccessToken();
    // generate refresh token
    const refreshToken = user.generateRefreshToken();
    // save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    const cookieOptions = {
        httpOnly: true,

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
            fullName: user.fullName
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


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};