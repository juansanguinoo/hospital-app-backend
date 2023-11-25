import { generateToken } from "../helpers/jwt.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { verify } from "../helpers/google-verify.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = await generateToken(user.id);

    res.json({
      message: "User logged successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { email, name, picture } = await verify(req.body.token);

    const existsUser = await User.findOne({ email });
    let user;

    if (!existsUser) {
      user = new User({
        name,
        email,
        password: ":P",
        img: picture,
        google: true,
      });
    } else {
      user = existsUser;
      user.google = true;
    }

    await user.save();

    const token = await generateToken(user.id);

    res.json({
      message: "User logged successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Invalid Google token",
    });
  }
};

export { login, loginWithGoogle };
