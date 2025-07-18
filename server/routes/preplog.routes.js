import { Router } from "express";

import {
  getPrepLogs,
  createPrepLog,
  updatePrepLog,
  deletePrepLog,
  getMyPrepLogs,
} from "../controllers/preplog.controllers.js";
import { preplogCreateValidator, preplogEditValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import checkUser from "../middlewares/checkuser.middleware.js";


const router = Router();

// Middleware to check if the user is authenticated


router.get("/", checkUser, getPrepLogs);

router.post("/", preplogCreateValidator(), validate, checkUser,createPrepLog);


router.put("/:id", preplogEditValidator(), validate,checkUser, updatePrepLog);

router.delete("/:id",checkUser, deletePrepLog);

router.get('/my', checkUser, getMyPrepLogs);


export default router;
