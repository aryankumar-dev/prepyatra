import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

    },
    {
        timestamps: true,
    }
);  

export const Course = mongoose.model("Course", courseSchema);