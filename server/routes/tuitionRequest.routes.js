import { Router } from "express";
import {
    createTuitionRequest,
    getMyTuitionRequests,
    getOpenTuitionRequests,
    getMyTutoringJobs,
    offerTuition,
    respondToTuitionOffer,
} from "#controllers/tuitionRequest.controllers.js";
import {
    tuitionRequestCreateValidator,
    tuitionOfferValidator,
    tuitionRespondValidator,
} from "#validators/index.js";
import { validate } from "#middlewares/validator.middleware.js";
import checkUser from "#middlewares/checkuser.middleware.js";

const router = Router();

router.post("/", checkUser, tuitionRequestCreateValidator(), validate, createTuitionRequest);
router.get("/my", checkUser, getMyTuitionRequests);
router.get("/open", checkUser, getOpenTuitionRequests);
router.get("/mine-as-tutor", checkUser, getMyTutoringJobs);
router.put("/:id/offer", checkUser, tuitionOfferValidator(), validate, offerTuition);
router.put("/:id/respond", checkUser, tuitionRespondValidator(), validate, respondToTuitionOffer);

export default router;
