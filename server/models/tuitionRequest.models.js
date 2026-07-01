import mongoose, { Schema } from "mongoose";

const tuitionRequestSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        message: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["open", "offered", "accepted", "rejected"],
            default: "open",
            index: true,
        },
        tutorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        price: {
            type: Number,
            default: null,
        },
    },
    { timestamps: true }
);

export const TuitionRequest = mongoose.model("TuitionRequest", tuitionRequestSchema);
