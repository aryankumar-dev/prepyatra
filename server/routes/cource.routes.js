import { Router } from "express";

import { getAllCourses, createCourse, editCourse, deleteCourse } from "../controllers/course.controllers.js";

const router = Router();

router.get("/", getAllCourses);

router.post("/", createCourse);
router.put("/:courseId", editCourse);
router.delete("/:courseId", deleteCourse);

export default router;
