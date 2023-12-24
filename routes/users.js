import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleleUser,
} from "../controllers/users.js";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";
import {
  validateJWT,
  validateRole,
  validateRoleOrSameUser,
} from "../middleware/validate-jwt.js";

const router = Router();

router.get("/get-users", validateJWT, getUsers);

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
    validateJWT,
    validateRoleOrSameUser,
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    validationFields,
  ],
  updateUser
);

router.delete("/delete-user/:id", validateJWT, deleleUser);

export default router;
