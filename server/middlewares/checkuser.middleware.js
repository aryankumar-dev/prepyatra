import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-handler.js";

const checkUser = asyncHandler(async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(`accessToken = ${accessToken}, refreshToken = ${refreshToken}`);

    const cookieOptions = {
        httpOnly: true,
    };

    if (!accessToken) {
        console.log("Access token missing, checking refresh token...");

        if (!refreshToken) {
            return res.status(401).json(
                new ApiResponse(401, null, "Unauthorized access hai bahi")
            );

        }
         // ✅ VERIFY REFRESH TOKEN



    }



});


export default checkUser;
