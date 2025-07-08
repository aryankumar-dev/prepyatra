import { asyncHandler } from "../utils/async-handler.js";
import  ApiResponse  from "../utils/api-response.js";
import  ApiError  from "../utils/api-error.js";

import { Course } from "../models/course.models.js";


const createCourse = asyncHandler(async (req, res) => {

    const { title } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ title });

    if (existingCourse) {
        return next(new ApiError("Course already exists", 400));
    }

    // Create new course 
    const course = await Course.create({ title });

    return new ApiResponse(res, 201, course);
});

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    return new ApiResponse(res, 200, courses);
});

const editCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ApiError("Course not found", 404));
    }

    // Update course
    course.title = title;
    await course.save();

    return new ApiResponse(res, 200, course);
});
const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        return next(new ApiError("Course not found", 404));
    }

    // Delete course
    await course.remove();

    return new ApiResponse(res, 200, { message: "Course deleted successfully" });
});

export {
    createCourse,
    getAllCourses,
    editCourse,
    deleteCourse
};

