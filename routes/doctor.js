import { Router } from "express";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.js";

const router = Router();

router.get("/get-doctors", validateJWT, getDoctors);

router.post(
  "/create-doctor",
  [
    validateJWT,
    check("name", "Doctor name is required").not().isEmpty(),
    check("hospital", "Hospital id is required").isMongoId(),
    validationFields,
  ],
  createDoctor
);

router.put(
  "/update-doctor/:id",
  [
    validateJWT,
    check("name", "Doctor name is required").not().isEmpty(),
    check("hospital", "Hospital id is required").isMongoId(),
    validationFields,
  ],
  updateDoctor
);

router.delete("/delete-doctor/:id", validateJWT, deleteDoctor);

router.get("/get-doctor/:id", validateJWT, getDoctorById);

export default router;
