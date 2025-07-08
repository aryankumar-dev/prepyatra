import mongoose from "mongoose";

const prepLogSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true

    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    timespend:{
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true,
});

export const PrepLog = mongoose.model("PrepLog", prepLogSchema);