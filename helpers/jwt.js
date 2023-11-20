import jwt from "jsonwebtoken";

const generateToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "12h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Token can not be generated");
        }

        resolve(token);
      }
    );
  });
};

export { generateToken };
