import { Router } from "express";
import { getResources, createResource } from "#controllers/resource.controllers.js";
import { resourceCreateValidator } from "#validators/index.js";
import { validate } from "#middlewares/validator.middleware.js";
import checkUser from "#middlewares/checkuser.middleware.js";

const router = Router();

router.get("/", checkUser, getResources);
router.post("/", checkUser, resourceCreateValidator(), validate, createResource);

export default router;
