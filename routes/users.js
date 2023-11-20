import { Router } from "express";
import { createUser, getUsers, updateUser } from "../controllers/users.js";
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

router.put(
  "/update-user/:id",
  [
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Email is required").isEmail(),
      check("role", "Role is required").not().isEmpty(),
      validationFields,
    ],
  ],
  updateUser
);

export default router;
