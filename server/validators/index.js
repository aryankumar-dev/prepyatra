import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at lease 3 characters long"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),
    body("role")
      .optional()
      .isIn(["student", "tutor"])
      .withMessage("Role must be either student or tutor"),
    body("courseId")
      .optional({ checkFalsy: true })
      .isMongoId()
      .withMessage("Course id is invalid"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userUpdateProfileValidator = () => {
  return [
    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),
    body("username")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("email")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("courseId")
      .optional({ checkFalsy: true })
      .isMongoId()
      .withMessage("Course id is invalid"),
  ];
};

const changePasswordValidator = () => {
  return [
    body("currentPassword")
      .trim()
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ];
};

const tuitionRequestCreateValidator = () => {
  return [
    body("courseId")
      .trim()
      .notEmpty()
      .withMessage("Course is required")
      .isMongoId()
      .withMessage("Course id is invalid"),
    body("message").optional().trim(),
  ];
};

const tuitionOfferValidator = () => {
  return [
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 1 })
      .withMessage("Price must be a positive number"),
  ];
};

const tuitionRespondValidator = () => {
  return [
    body("accept")
      .notEmpty()
      .withMessage("Accept is required")
      .isBoolean()
      .withMessage("Accept must be true or false"),
  ];
};

const resourceCreateValidator = () => {
  return [
    body("courseId")
      .trim()
      .notEmpty()
      .withMessage("Course is required")
      .isMongoId()
      .withMessage("Course id is invalid"),
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required"),
    body("url")
      .trim()
      .notEmpty()
      .withMessage("URL is required")
      .isURL()
      .withMessage("URL must be a valid link"),
    body("description").optional().trim(),
    body("type")
      .optional()
      .isIn(["video", "article", "practice", "course"])
      .withMessage("Type must be one of: video, article, practice, course"),
  ];
};

const courseCreateValidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
  ];
}

const courseEditValidator = () => {
  return [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
  ];
};

const preplogCreateValidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("timespend")
      .isNumeric()
      .withMessage("Time spent must be a number")
      .custom(value => value >= 0)
      .withMessage("Time spent cannot be negative"),
  ];
};

const preplogEditValidator = () => {
  return [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("timespend")
      .optional()
      .isNumeric()
      .withMessage("Time spent must be a number")
      .custom(value => value >= 0)
      .withMessage("Time spent cannot be negative"),
  ];
};


const recruiterNetworkCreateValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Email is invalid"),
   body("phone")
  .optional()
  .trim()
  .isMobilePhone("en-IN")  // Target Indian format
  .withMessage("Phone number is invalid"),
    body("company")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Company is required")
      .isLength({ min: 3 })
      .withMessage("Company must be at least 3 characters long"),
    body("appliedFor")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Applied for is required")
      .isLength({ min: 3 })
      .withMessage("Applied for must be at least 3 characters long"),
    body("status")
      .optional()             
      .trim()
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["screening", "in_progress", "interviewing", "offer_letter" , "rejected"])
      .withMessage("Status must be one of the following: applied, interviewing, offer, rejected"),
    body("followUpDate")
      .optional()     
      .isISO8601()
      .withMessage("Follow-up date must be a valid date in ISO 8601 format"),
    body("lastInterviewDate")
      .optional()   
      .isISO8601()
      .withMessage("Last interview date must be a valid date in ISO 8601 format"),
    body("link")
      .optional()
      .trim()
      .isURL()  
      .withMessage("Link must be a valid URL"),
    body("comments")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Comments are required")
      .isLength({ min: 3 })
      .withMessage("Comments must be at least 3 characters long"),
  ];
};    


const recruiterNetworkEditValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Email is invalid"),
  body("phone")
  .optional()
  .trim()
  .isMobilePhone("en-IN")  // Target Indian format
  .withMessage("Phone number is invalid"),
    body("company")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Company is required")
      .isLength({ min: 3 })
      .withMessage("Company must be at least 3 characters long"),
    body("appliedFor")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Applied for is required")
      .isLength({ min: 3 })
      .withMessage("Applied for must be at least 3 characters long"),
    body("status")
      .optional()             
      .trim()
      .notEmpty()
      .withMessage("Status is required")
       .isIn(["screening", "in_progress", "interviewing", "offer_letter" , "rejected"])
      .withMessage("Status must be one of the following: applied, interviewing, offer, rejected"),
    body("followUpDate")
      .optional()     
      .isISO8601()
      .withMessage("Follow-up date must be a valid date in ISO 8601 format"),
    body("lastInterviewDate")
      .optional()   
      .isISO8601()
      .withMessage("Last interview date must be a valid date in ISO 8601 format"),
    body("link")
      .optional()
      .trim()
      .isURL()  
      .withMessage("Link must be a valid URL"),
    body("comments")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Comments are required")
      .isLength({ min: 3 })
      .withMessage("Comments must be at least 3 characters long"),
  ];
}

const unblockRequestCreateValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Please tell us why you should be unblocked")
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters long"),
  ];
};


export {
  userRegisterValidator,
  userLoginValidator,
  userUpdateProfileValidator,
  changePasswordValidator,
  resourceCreateValidator,
  tuitionRequestCreateValidator,
  tuitionOfferValidator,
  tuitionRespondValidator,
  courseCreateValidator,
  courseEditValidator,
  preplogCreateValidator,
  preplogEditValidator,
  recruiterNetworkCreateValidator,
  recruiterNetworkEditValidator,
  unblockRequestCreateValidator
};