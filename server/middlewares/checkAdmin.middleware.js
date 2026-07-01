import ApiError from "#utils/api-error.js";
import { asyncHandler } from "#utils/async-handler.js";

const checkAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }
  next();
});

export default checkAdmin;
