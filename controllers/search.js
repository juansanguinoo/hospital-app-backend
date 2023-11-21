import User from "../models/user.js";
import Hospital from "../models/hospital.js";
import Doctor from "../models/doctor.js";

const searchByFilter = async (req, res) => {
  const filter = req.params.filter;
  const regex = new RegExp(filter, "i");

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Doctor.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    doctors,
  });
};

const searchByModelAndFilter = async (req, res) => {
  const model = req.params.model;
  const filter = req.params.filter;
  const regex = new RegExp(filter, "i");

  let data = [];

  switch (model) {
    case "users":
      data = await User.find({ name: regex });
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name");

      break;
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name")
        .populate("hospital", "name");
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "The available models are: users, hospitals and doctors",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

export { searchByFilter, searchByModelAndFilter };
