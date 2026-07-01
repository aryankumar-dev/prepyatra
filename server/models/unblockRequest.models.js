import mongoose, { Schema } from "mongoose";

const unblockRequestSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "denied"],
            default: "pending",
            index: true,
        },
    },
    { timestamps: true }
);

export const UnblockRequest = mongoose.model("UnblockRequest", unblockRequestSchema);
