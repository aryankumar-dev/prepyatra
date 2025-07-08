import mongoose from "mongoose";
import { StatusEnum } from "../utils/constants.js";
import { AvailableStatus } from "../utils/constants.js";


const RecruiterNetworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    company: {
        type: String,
        required: false,
        trim: true,
    },
    appliedFor: {
        type: String,
        required: false,
        trim: true,
    },
    status: {
        type: String,
        enum: AvailableStatus,
        default: StatusEnum.SCREENING,
        trim: true,
    },
    followUpDate: {
        type: Date,
        required: false,
        default: null,
    },
    lastIntreviewDate: {
        type: Date,
        required: false,
        default: null,

    },
    link: {
        type: String,
        required: false,
        trim: true,
    },
    Comments: {
        type: String,
        required: false,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

export const RecruiterNetwork = mongoose.model("RecruiterNetwork", RecruiterNetworkSchema);


