import { Router } from "express";
import { getAllPreplogs, createPreplog, editPreplog, deletePreplog,getPrepLogById } from "../controllers/preplog.controllers.js";
import { preplogCreateValidator, preplogEditValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/", getAllPreplogs);

router.post("/", preplogCreateValidator(), validate, createPreplog);


router.put("/:id", preplogEditValidator(), validate, editPreplog);

router.delete("/:id", deletePreplog);

router.get("/:id", getPrepLogById);

export default router;
