import { validationResult, check } from "express-validator";
import { BadRequest } from "./errors";

// function of validation rules

const userValidationRules = () => {
  return [
    // name must not be empty
    check("name", "name is required").trim().not().isEmpty(),
    check("email", "email is required").trim().isEmail(),
  ];
};

const postValidationRules = () => {
  return [
    // title and desc must not be empty
    check("title", "title is required").trim().not().isEmpty(),
    check("desc", "description is required").trim().not().isEmpty(),
  ];
};

// actual validation

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  throw new BadRequest("", extractedErrors);
};

export { userValidationRules, postValidationRules, validate };
