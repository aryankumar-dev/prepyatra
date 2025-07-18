import { Router } from "express";
import {
   createRecruiterNetwork,
    getRecruiterNetwork,
    updateRecruiterNetwork,
    deleteRecruiterNetwork,
    getMyRecruiterNetwork
} from "../controllers/recruiterNetwork.controllers.js";
import { recruiterNetworkCreateValidator, recruiterNetworkEditValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import checkUser from "../middlewares/checkuser.middleware.js";      


const router = Router();

router.post("/create",
    checkUser,
    recruiterNetworkCreateValidator(),
    validate,
    createRecruiterNetwork
);  

router.get("/getall", checkUser, getRecruiterNetwork);

router.put(
    "/:id",
    checkUser,
    recruiterNetworkEditValidator(),
    validate,
    updateRecruiterNetwork
);
router.delete("/:id", checkUser, deleteRecruiterNetwork);



router.get("/my", checkUser, getMyRecruiterNetwork);



export default router;