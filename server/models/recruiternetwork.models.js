import mongoose from "mongoose";

const prepLogSchema = new mongoose.Schema({
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
        required: false,
        enum: ['applied', 'interviewing', 'offer', 'rejected'],
        default: 'applied',
    },
    followUpDate: {
        type: Date,
        required: false,
        default: null,
    },
    lastintreviewDate: {
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

export const PrepLog = mongoose.model("PrepLog", prepLogSchema);