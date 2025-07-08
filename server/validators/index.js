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


export {
  userRegisterValidator,
  userLoginValidator,
  courseCreateValidator,
  courseEditValidator,
  preplogCreateValidator,
  preplogEditValidator,
};