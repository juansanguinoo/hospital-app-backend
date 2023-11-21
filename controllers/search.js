import User from "../models/User.js";
import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";

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

export { searchByFilter };
