import { Router } from "express";
import { registerUser, loginUser , logoutUser,getCurrentUser, updateProfile, changePassword} from "#controllers/auth.controllers.js";
import { userRegisterValidator, userLoginValidator, userUpdateProfileValidator, changePasswordValidator } from "#validators/index.js";
import checkUser from "#middlewares/checkuser.middleware.js";
import { validate } from "#middlewares/validator.middleware.js";

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

  router.route("/profile")
  .put(checkUser, userUpdateProfileValidator(), validate, updateProfile);

  router.route("/change-password")
  .put(checkUser, changePasswordValidator(), validate, changePassword);



export default router;
