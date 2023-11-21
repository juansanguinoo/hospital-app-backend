import { Router } from "express";
import { validateJWT } from "../middleware/validate-jwt.js";
import { searchByFilter } from "../controllers/search.js";

const router = Router();

router.get("/:filter", validateJWT, searchByFilter);

export default router;
