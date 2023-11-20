import { validationResult } from "express-validator";

const validationFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.mapped(),
    });
  }

  next();
};

export { validationFields };
