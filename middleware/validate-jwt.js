import jwt from "jsonwebtoken";

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

export { validateJWT };
