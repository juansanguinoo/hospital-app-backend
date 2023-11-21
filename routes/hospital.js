import { Router } from "express";
import { check } from "express-validator";
import { validationFields } from "../middleware/validation.js";
import { validateJWT } from "../middleware/validate-jwt.js";
import {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
} from "../controllers/hospitals.js";

const router = Router();

router.get("/get-hospitals", validateJWT, getHospitals);

router.post("/create-hospital", [validationFields], createHospital);

router.put(
  "/update-hospital/:id",
  [validateJWT, validationFields],
  updateHospital
);

router.delete("/delete-hospital/:id", validateJWT, deleteHospital);

export default router;
