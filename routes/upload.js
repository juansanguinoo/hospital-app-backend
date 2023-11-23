import { Router } from "express";
import { validateJWT } from "../middleware/validate-jwt.js";
import { getImage, uploadFile } from "../controllers/upload.js";
import fileUpload from "express-fileupload";
import { validationFields } from "../middleware/validation.js";
import { check } from "express-validator";

const router = Router();

router.use(fileUpload());

router.put(
  "/:model/:id",
  [
    validateJWT,
    check("id", "Id is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    validationFields,
  ],
  uploadFile
);

router.get("/:model/:image", validateJWT, getImage);

export default router;
