import { asyncHandler } from "#utils/async-handler.js";
import ApiResponse from "#utils/api-response.js";
import ApiError from "#utils/api-error.js";
import { User } from "#models/user.models.js";
import { UnblockRequest } from "#models/unblockRequest.models.js";
import { sendEmail } from "#utils/mailer.js";
import { unblockRequestReceivedEmail } from "#utils/emailTemplates.js";

const createUnblockRequest = asyncHandler(async (req, res) => {
    const { email, message } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "No account found with this email");
    }
    if (!user.isBlocked) {
        throw new ApiError(400, "This account is not blocked");
    }

    const existing = await UnblockRequest.findOne({ userId: user._id, status: "pending" });
    if (existing) {
        throw new ApiError(400, "You already have a pending unblock request");
    }

    const request = await UnblockRequest.create({ userId: user._id, message });

    const { subject, html } = unblockRequestReceivedEmail({ userName: user.fullName, userEmail: user.email, message });
    sendEmail({ to: process.env.ADMIN_EMAIL, subject, html });

    res.status(201).json(new ApiResponse(201, request, "Your review request has been submitted"));
});

export { createUnblockRequest };
