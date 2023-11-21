import Doctor from "../models/doctor.js";

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find()
    .populate("user", "name")
    .populate("hospital", "name");

  res.json({
    msg: "Doctors retrieved successfully.",
    doctors,
  });
};

const createDoctor = async (req, res) => {
  const uid = req.uid;
  const doctor = new Doctor({
    user: uid,
    ...req.body,
  });

  try {
    const saveDoctor = await doctor.save();

    res.json({
      msg: "Doctor created successfully.",
      doctor: saveDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

const updateDoctor = async (req, res) => {};

const deleteDoctor = async (req, res) => {};

export { createDoctor, deleteDoctor, getDoctors, updateDoctor };
