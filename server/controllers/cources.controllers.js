import { asyncHandler } from "../utils/async-handler.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import { Course } from "../models/course.models.js";


const createCourse = asyncHandler(async (req, res) => {

    const { title } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({ title });

    if (existingCourse) {
        throw new ApiError(400, "Course already exists");
    }

    // Create new course 
    const course = await Course.create({ title });
    if (!course) {
        throw new ApiError(500, "Course creation failed");
    }

    res.status(201).json(new ApiResponse(201, {
        course

    }, "Course created successfully"));
});

const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
        throw new ApiError(404, "No courses found");
    }
 
    res.status(201).json(new ApiResponse(201, {
        courses

    }, "Courses retrieved successfully"));

});

const editCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");

    }

    // Update course
    course.title = title;
    await course.save();

  
  return  res.status(201).json(new ApiResponse(201, {
        course

    }, "Course updated successfully"));

});
const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    res.status(200).json(new ApiResponse(200, {}, "Course deleted successfully"));
});

export {
    createCourse,
    getAllCourses,
    editCourse,
    deleteCourse
};
