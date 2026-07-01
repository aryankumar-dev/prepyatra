import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ["video", "article", "practice", "course"],
            default: "article",
        },
    },
    { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
