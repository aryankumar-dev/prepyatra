// server/models/recruiterNetwork.models.js
import mongoose from "mongoose";
import { StatusEnum, AvailableStatus } from "../utils/constants.js";

const RecruiterNetworkSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    appliedFor: { type: String, trim: true },
    status: {
        type: String,
        enum: AvailableStatus,
        default: StatusEnum.SCREENING,
        trim: true,
    },
    followUpDate: { type: Date, default: null },
    lastInterviewDate: { type: Date, default: null },
    link: { type: String, trim: true },
    comments: { type: String, trim: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

export const RecruiterNetwork = mongoose.model("RecruiterNetwork", RecruiterNetworkSchema);
