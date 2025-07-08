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
      .isMobilePhone("any")
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
      .isIn(["applied", "interviewing", "offer", "rejected"])
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
      .isMobilePhone("any")
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
      .isIn(["applied", "interviewing", "offer", "rejected"])
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

      
export {
  userRegisterValidator,
  userLoginValidator,
  courseCreateValidator,
  courseEditValidator,
  preplogCreateValidator,
  preplogEditValidator,
  recruiterNetworkCreateValidator,
  recruiterNetworkEditValidator
};