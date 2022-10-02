/** @format */

import { body } from "express-validator";

export const userValidation = [
  body("name").exists().withMessage("Name is a mandatory field!!"),
  body("surname").exists().withMessage("Surname is a mandatory field!!"),
  body("age")
    .exists()
    .withMessage("age is a mandatory field!!")
    .isInt()
    .withMessage("Age should be a number!"),
  body("email")
    .exists()
    .withMessage("Email is a mandatory field")
    .isEmail()
    .withMessage("Not a valid email address"),
];
