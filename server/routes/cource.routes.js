import { Router } from "express";

import { getAllCourses, createCourse, editCourse, deleteCourse } from "#controllers/cources.controllers.js";
import { courseCreateValidator, courseEditValidator } from "#validators/index.js";
import { validate } from "#middlewares/validator.middleware.js";
import checkUser from "#middlewares/checkuser.middleware.js";
import checkAdmin from "#middlewares/checkAdmin.middleware.js";

const router = Router();

router.get("/", getAllCourses);

router.post("/", checkUser, checkAdmin, courseCreateValidator(), validate, createCourse);

router.put("/:courseId", checkUser, checkAdmin, courseEditValidator(), validate, editCourse);

router.delete("/:courseId", checkUser, checkAdmin, deleteCourse);

export default router;
