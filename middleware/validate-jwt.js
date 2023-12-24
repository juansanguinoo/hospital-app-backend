import jwt from "jsonwebtoken";
import User from "../models/user.js";

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Token is required",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }
};

const validateRole = async (req, res, next) => {
  const uid = req.uid;

  try {
    const existsUser = await User.findById(uid);

    if (!existsUser) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    if (existsUser.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        message: "User not authorized",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Invalid token",
    });
  }
};

export { validateJWT, validateRole };
