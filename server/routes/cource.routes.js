import { Router } from "express";

import { getAllCourses, createCourse, editCourse, deleteCourse } from "../controllers/cources.controllers.js";
import { courseCreateValidator, courseEditValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", getAllCourses);

router.post("/", courseCreateValidator(), validate, createCourse);

router.route("/")
  .post(courseCreateValidator(), validate, createCourse);

router.put("/:courseId", courseEditValidator(), validate, editCourse);

router.delete("/:courseId", deleteCourse);

export default router;
