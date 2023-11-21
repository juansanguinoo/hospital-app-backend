import Doctor from "../models/doctor.js";

const getDoctors = async (req, res) => {};

const createDoctor = async (req, res) => {
  const uid = req.uid;
  const doctor = new doctor({
    user: uid,
    ...req.body,
  });

  try {
    const saveDoctor = await Doctor.save();

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
