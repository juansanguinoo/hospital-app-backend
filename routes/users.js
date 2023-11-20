import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.js";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";

const router = Router();

router.get("/get-users", getUsers);

router.post(
  "/create-user",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validationFields,
  ],
  createUser
);

export default router;
