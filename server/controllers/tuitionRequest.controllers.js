import { asyncHandler } from "#utils/async-handler.js";
import ApiResponse from "#utils/api-response.js";
import ApiError from "#utils/api-error.js";
import { TuitionRequest } from "#models/tuitionRequest.models.js";
import { Course } from "#models/course.models.js";
import { User } from "#models/user.models.js";
import { sendEmail } from "#utils/mailer.js";
import { requestReceivedEmail, tutorFoundEmail, requestOutcomeEmail } from "#utils/emailTemplates.js";

const createTuitionRequest = asyncHandler(async (req, res) => {
    const { courseId, message } = req.body;
    const studentId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    const tuitionRequest = await TuitionRequest.create({ studentId, courseId, message });

    const student = await User.findById(studentId);
    const { subject, html } = requestReceivedEmail({ studentName: student.fullName, courseTitle: course.title });
    sendEmail({ to: student.email, subject, html });

    res.status(201).json(new ApiResponse(201, tuitionRequest, "Tuition request created successfully"));
});

const getMyTuitionRequests = asyncHandler(async (req, res) => {
    const requests = await TuitionRequest.find({ studentId: req.user._id })
        .populate("courseId", "title")
        .populate("tutorId", "fullName email")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, requests, "Tuition requests retrieved successfully"));
});

const getOpenTuitionRequests = asyncHandler(async (req, res) => {
    const requests = await TuitionRequest.find({ status: "open" })
        .populate("courseId", "title")
        .populate("studentId", "fullName")
        .sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, requests, "Open tuition requests retrieved successfully"));
});

const getMyTutoringJobs = asyncHandler(async (req, res) => {
    const requests = await TuitionRequest.find({ tutorId: req.user._id, status: "accepted" })
        .populate("courseId", "title")
        .populate("studentId", "fullName email")
        .sort({ updatedAt: -1 });

    res.status(200).json(new ApiResponse(200, requests, "Accepted tutoring jobs retrieved successfully"));
});

const offerTuition = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    const tutorId = req.user._id;

    const tuitionRequest = await TuitionRequest.findById(id).populate("courseId", "title").populate("studentId", "fullName email");
    if (!tuitionRequest) {
        throw new ApiError(404, "Tuition request not found");
    }
    if (tuitionRequest.status !== "open") {
        throw new ApiError(400, "This request is no longer open for offers");
    }

    tuitionRequest.tutorId = tutorId;
    tuitionRequest.price = price;
    tuitionRequest.status = "offered";
    await tuitionRequest.save();

    const tutor = await User.findById(tutorId);
    const { subject, html } = tutorFoundEmail({
        studentName: tuitionRequest.studentId.fullName,
        courseTitle: tuitionRequest.courseId.title,
        price,
        tutorName: tutor.fullName,
    });
    sendEmail({ to: tuitionRequest.studentId.email, subject, html });

    res.status(200).json(new ApiResponse(200, tuitionRequest, "Offer submitted successfully"));
});

const respondToTuitionOffer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { accept } = req.body;
    const studentId = req.user._id;

    const tuitionRequest = await TuitionRequest.findById(id).populate("courseId", "title").populate("studentId", "fullName email").populate("tutorId", "fullName email");
    if (!tuitionRequest) {
        throw new ApiError(404, "Tuition request not found");
    }
    if (String(tuitionRequest.studentId._id) !== String(studentId)) {
        throw new ApiError(403, "You are not authorized to respond to this request");
    }
    if (tuitionRequest.status !== "offered") {
        throw new ApiError(400, "This request has no pending offer");
    }

    const { courseId, studentId: student, tutorId: tutor, price } = tuitionRequest;

    const studentEmail = requestOutcomeEmail({
        toName: student.fullName,
        courseTitle: courseId.title,
        price,
        otherPartyName: tutor.fullName,
        accepted: accept,
        isStudent: true,
    });
    const tutorEmail = requestOutcomeEmail({
        toName: tutor.fullName,
        courseTitle: courseId.title,
        price,
        otherPartyName: student.fullName,
        accepted: accept,
        isStudent: false,
    });
    sendEmail({ to: student.email, ...studentEmail });
    sendEmail({ to: tutor.email, ...tutorEmail });

    if (accept) {
        tuitionRequest.status = "accepted";
    } else {
        tuitionRequest.status = "open";
        tuitionRequest.tutorId = null;
        tuitionRequest.price = null;
    }
    await tuitionRequest.save();

    res.status(200).json(new ApiResponse(200, tuitionRequest, accept ? "Offer accepted" : "Offer rejected"));
});

export {
    createTuitionRequest,
    getMyTuitionRequests,
    getOpenTuitionRequests,
    getMyTutoringJobs,
    offerTuition,
    respondToTuitionOffer,
};
