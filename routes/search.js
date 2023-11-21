import { Router } from "express";
import { validateJWT } from "../middleware/validate-jwt.js";
import {
  searchByFilter,
  searchByModelAndFilter,
} from "../controllers/search.js";

const router = Router();

router.get("/:filter", validateJWT, searchByFilter);
router.get("/:model/:filter", validateJWT, searchByModelAndFilter);

export default router;
