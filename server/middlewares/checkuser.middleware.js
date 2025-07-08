import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const checkUser = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  // No access token, check refresh token
  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json(
        new ApiResponse(401, null, "Unauthorized access hai bahi")
      );
    }

    let refreshDecoded;
    try {
      refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json(
        new ApiError(401, "Invalid or expired refresh token")
      );
    }

    const user = await User.findById(refreshDecoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json(
        new ApiError(401, "User not found with this refresh token")
      );
    }

    const newAccessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const newRefreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    req.user = user;
    return next();
  }

  // Access token present
  let accessDecoded;
  try {
    accessDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json(
      new ApiError(401, "Invalid or expired access token")
    );
  }

  const user = await User.findById(accessDecoded._id);
  if (!user) {
    return res.status(401).json(
      new ApiError(401, "User not found with this access token")
    );
  }

  const newAccessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const newRefreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("accessToken", newAccessToken, cookieOptions);
  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  req.user = user;
  next();
});

export default checkUser;
