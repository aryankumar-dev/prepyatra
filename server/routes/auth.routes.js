import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers.js";
import { userRegisterValidator, userLoginValidator } from "../validators/index.js";
import checkUser from "../middlewares/checkuser.middleware.js";




const router = Router();
// Route to register a new user
router.post("/register", registerUser);
// Route to login an existing user
router.post("/login", loginUser);
// Export the router to be used in the main app
export default router;
