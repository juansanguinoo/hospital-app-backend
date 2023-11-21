import { generateToken } from "../helpers/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find().skip(from).limit(5),
    User.countDocuments(),
  ]);

  res.json({
    message: "Users retrieved successfully",
    users,
    total,
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

    const token = await generateToken(user.id);

    res.json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const existUser = await User.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (existUser.email !== email) {
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    fields.email = email;

    const user = await User.findByIdAndUpdate(uid, fields, { new: true });

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleleUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const existUser = await User.findById(uid);

    if (!existUser) {
      return res.status(404).json({
        message: "User does not exists",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export { getUsers, createUser, updateUser, deleleUser };
