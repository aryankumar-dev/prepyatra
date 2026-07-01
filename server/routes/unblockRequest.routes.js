import { Router } from "express";
import { createUnblockRequest } from "#controllers/unblockRequest.controllers.js";
import { unblockRequestCreateValidator } from "#validators/index.js";
import { validate } from "#middlewares/validator.middleware.js";

const router = Router();

router.post("/", unblockRequestCreateValidator(), validate, createUnblockRequest);

export default router;
