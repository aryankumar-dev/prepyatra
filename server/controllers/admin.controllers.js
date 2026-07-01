import { asyncHandler } from "#utils/async-handler.js";
import ApiResponse from "#utils/api-response.js";
import ApiError from "#utils/api-error.js";
import { User } from "#models/user.models.js";
import { Course } from "#models/course.models.js";
import { Resource } from "#models/resource.models.js";
import { TuitionRequest } from "#models/tuitionRequest.models.js";
import { UnblockRequest } from "#models/unblockRequest.models.js";
import { sendEmail } from "#utils/mailer.js";
import { accountBlockedEmail, unblockRequestResolvedEmail } from "#utils/emailTemplates.js";

const getStats = asyncHandler(async (req, res) => {
    const [totalUsers, totalStudents, totalTutors, totalCourses, totalResources, totalAppointments, totalOfferedRequests, totalOpenRequests, totalBlockedUsers, pendingUnblockRequests] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "student" }),
        User.countDocuments({ role: "tutor" }),
        Course.countDocuments(),
        Resource.countDocuments(),
        TuitionRequest.countDocuments({ status: "accepted" }),
        TuitionRequest.countDocuments({ status: "offered" }),
        TuitionRequest.countDocuments({ status: "open" }),
        User.countDocuments({ isBlocked: true }),
        UnblockRequest.countDocuments({ status: "pending" }),
    ]);

    res.status(200).json(new ApiResponse(200, {
        totalUsers,
        totalStudents,
        totalTutors,
        totalCourses,
        totalResources,
        totalAppointments,
        totalOfferedRequests,
        totalOpenRequests,
        totalBlockedUsers,
        pendingUnblockRequests,
    }, "Admin stats retrieved successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select("-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry")
        .populate("courseId", "title")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
});

const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await TuitionRequest.find({ status: "accepted" })
        .populate("courseId", "title")
        .populate("studentId", "fullName email")
        .populate("tutorId", "fullName email")
        .sort({ updatedAt: -1 });

    res.status(200).json(new ApiResponse(200, appointments, "Appointments retrieved successfully"));
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (user.role === "admin") {
        throw new ApiError(400, "Cannot block an admin account");
    }

    user.isBlocked = true;
    await user.save();

    const { subject, html } = accountBlockedEmail({ userName: user.fullName });
    sendEmail({ to: user.email, subject, html });

    const safeUser = await User.findById(id).select("-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry");
    res.status(200).json(new ApiResponse(200, safeUser, "User blocked successfully"));
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.isBlocked = false;
    await user.save();

    await UnblockRequest.updateMany({ userId: id, status: "pending" }, { status: "approved" });

    const { subject, html } = unblockRequestResolvedEmail({ userName: user.fullName, approved: true });
    sendEmail({ to: user.email, subject, html });

    const safeUser = await User.findById(id).select("-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry");
    res.status(200).json(new ApiResponse(200, safeUser, "User unblocked successfully"));
});

const getPendingOffers = asyncHandler(async (req, res) => {
    const offers = await TuitionRequest.find({ status: "offered" })
        .populate("courseId", "title")
        .populate("studentId", "fullName email")
        .populate("tutorId", "fullName email")
        .sort({ updatedAt: -1 });

    res.status(200).json(new ApiResponse(200, offers, "Pending offers retrieved successfully"));
});

const getOpenOffers = asyncHandler(async (req, res) => {
    const offers = await TuitionRequest.find({ status: "open" })
        .populate("courseId", "title")
        .populate("studentId", "fullName email")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, offers, "Open offers retrieved successfully"));
});

const getUnblockRequests = asyncHandler(async (req, res) => {
    const requests = await UnblockRequest.find({ status: "pending" })
        .populate("userId", "fullName email isBlocked")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, requests, "Unblock requests retrieved successfully"));
});

const denyUnblockRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const request = await UnblockRequest.findById(id).populate("userId", "fullName email");
    if (!request) {
        throw new ApiError(404, "Unblock request not found");
    }
    if (request.status !== "pending") {
        throw new ApiError(400, "This request has already been resolved");
    }

    request.status = "denied";
    await request.save();

    const { subject, html } = unblockRequestResolvedEmail({ userName: request.userId.fullName, approved: false });
    sendEmail({ to: request.userId.email, subject, html });

    res.status(200).json(new ApiResponse(200, request, "Unblock request denied"));
});

export {
    getStats,
    getAllUsers,
    getAllAppointments,
    blockUser,
    unblockUser,
    getPendingOffers,
    getOpenOffers,
    getUnblockRequests,
    denyUnblockRequest,
};
