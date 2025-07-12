import { Router } from "express";
import { registerUser, loginUser , logoutUser,getCurrentUser} from "../controllers/auth.controllers.js";
import { userRegisterValidator, userLoginValidator } from "../validators/index.js";
import checkUser from "../middlewares/checkuser.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();
// Route to register a new user

router.route("/register")
  .post(userRegisterValidator(), validate, registerUser);

  router.route("/login")
  .post(userLoginValidator(), validate, loginUser);

  router.route("/logout")
  .post( checkUser, logoutUser);

  router.route("/me")
  .get(checkUser, getCurrentUser);

  

export default router;
