import User from "../models/User.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  const user = await User.find();

  res.json({
    message: "Users retrieved successfully",
    user,
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export { getUsers, createUser };
