import { asyncHandler } from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import { PrepLog } from "../models/preplog.models.js";

const createPrepLog = asyncHandler(async (req, res) => {
    const { title, description, timespend } = req.body;
    const userId = req.user._id;
    const prepLog = await PrepLog.create({ title, description, timespend ,userId});
    
    if (!prepLog) {
        throw new ApiError(500, "Prep log creation failed");
    }


    res.status(201).json(new ApiResponse(201, prepLog, "Prep log created successfully"));
});

const getPrepLogs = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const prepLogs = await PrepLog.find({ "userId" : userId}).sort({ createdAt: -1 });

    if (!prepLogs) {
        throw new ApiError(404, "No prep logs found");
    }

    res.status(200).json(new ApiResponse(200, prepLogs, "Prep logs retrieved successfully"));
});

const deletePrepLog = asyncHandler(async (req, res) => {
    const { id } = req.params;
   

    const prepLog = await PrepLog.findOneAndDelete({ _id: id });

    if (!prepLog) {
        throw new ApiError(404, "Prep log not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Prep log deleted successfully"));
});

const updatePrepLog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, timespend } = req.body;

    const prepLog = await PrepLog.findByIdAndUpdate(id, { title, description, timespend }, { new: true });

    if (!prepLog) {
        throw new ApiError(404, "Prep log not found");
    }

    res.status(200).json(new ApiResponse(200, prepLog, "Prep log updated successfully"));
});

const getMyPrepLogs = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const prepLogs = await PrepLog.find({ userId: userId }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, prepLogs, "Prep logs fetched successfully"));
});


export {
    createPrepLog,
    getPrepLogs,
    deletePrepLog,
    updatePrepLog,
    getMyPrepLogs
};