import { Router } from "express";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import {
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.js";

const router = Router();

router.get("/get-doctors", validateJWT, getDoctors);

router.post("/create-doctor", [validationFields], createDoctor);

router.put("/update-doctor/:id", [validateJWT, validationFields], updateDoctor);

router.delete("/delete-doctor/:id", validateJWT, deleteDoctor);

export default router;
