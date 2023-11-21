import { Router } from "express";
import { login } from "../controllers/auth.js";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validationFields,
  ],
  login
);

export default router;
