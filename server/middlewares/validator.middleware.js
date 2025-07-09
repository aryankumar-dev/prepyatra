import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const validate = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  console.log("Validation Errors:", result.array()); // ✅ ADD THIS

  const formattedErrors = result.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  throw new ApiError(422, "Received data is not valid", formattedErrors);
};
