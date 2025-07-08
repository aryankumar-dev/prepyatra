import { asyncHandler } from "../utils/async-handler.js";
import  ApiResponse  from "../utils/api-response.js";
import  ApiError  from "../utils/api-error.js";
import { RecruiterNetwork } from "../models/recruiterNetwork.models.js";

const createRecruiterNetwork = asyncHandler(async (req, res) => {
    const { name, email, phone, company, appliedFor, status, followUpDate, lastInterviewDate, link, comments } = req.body;

    const userId = req.user._id; 

    const recruiterNetwork = await RecruiterNetwork.create({

        name,
        email,
        phone,
        company,
        appliedFor,
        status,
        followUpDate,
        lastInterviewDate,
        link,
        comments,
        userId

    });

    if (!recruiterNetwork) {
        throw new ApiError(500, "Failed to create recruiter network entry");
    }

    res.status(201).json(new ApiResponse(201, recruiterNetwork, "Recruiter network entry created successfully"));
});

const getRecruiterNetwork = asyncHandler(async (req, res) => {
    const recruiterNetworks = await RecruiterNetwork.find({ userId: req.user._id });

    if (!recruiterNetworks || recruiterNetworks.length === 0) {
        throw new ApiError(404, "No recruiter network entries found");
    }

    res.status(200).json(new ApiResponse(200, recruiterNetworks, "Recruiter network entries retrieved successfully"));
});

const updateRecruiterNetwork = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, company, appliedFor, status, followUpDate, lastInterviewDate, link, comments } = req.body;

    const recruiterNetwork = await RecruiterNetwork.findByIdAndUpdate(
        id,
        {
            name,
            email,
            phone,
            company,
            appliedFor,
            status,
            followUpDate,
            lastInterviewDate,
            link,
            comments
        },
        { new: true }
    );

    if (!recruiterNetwork) {
        throw new ApiError(404, "Recruiter network entry not found");
    }

    res.status(200).json(new ApiResponse(200, recruiterNetwork, "Recruiter network entry updated successfully"));
});

const deleteRecruiterNetwork = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const recruiterNetwork = await RecruiterNetwork.findByIdAndDelete(id);

    if (!recruiterNetwork) {
        throw new ApiError(404, "Recruiter network entry not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Recruiter network entry deleted successfully"));
});

const getRecruiterNetworkById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const recruiterNetwork = await RecruiterNetwork.findById(id);

    if (!recruiterNetwork) {
        throw new ApiError(404, "Recruiter network entry not found");
    }

    res.status(200).json(new ApiResponse(200, recruiterNetwork, "Recruiter network entry retrieved successfully"));
});

export {
    createRecruiterNetwork,
    getRecruiterNetwork,
    updateRecruiterNetwork,
    deleteRecruiterNetwork,
    getRecruiterNetworkById
};