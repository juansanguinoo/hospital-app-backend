import Doctor from "../models/doctor.js";

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find({}, "name img")
    .populate("user", "name")
    .populate("hospital", "name");

  console.log(doctors.image);

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

const updateDoctor = async (req, res) => {
  try {
    const uid = req.params.id;

    const doctor = await Doctor.findById(uid);

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found.",
      });
    }

    const updateDoctor = {
      ...req.body,
      user: req.uid,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(uid, updateDoctor, {
      new: true,
    });

    res.json({
      msg: "Doctor updated successfully.",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const uid = req.params.id;

    const doctor = await Doctor.findById(uid);

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found.",
      });
    }

    await Doctor.findByIdAndDelete(uid);

    res.json({
      msg: "Doctor deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const uid = req.params.id;

    const doctor = await Doctor.findById(uid)
      .populate("user", "name img")
      .populate("hospital", "name img");

    if (!doctor) {
      return res.status(404).json({
        msg: "Doctor not found.",
      });
    }

    res.json({
      msg: "Doctor retrieved successfully.",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

export { createDoctor, deleteDoctor, getDoctors, updateDoctor, getDoctorById };
