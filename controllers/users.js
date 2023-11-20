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
