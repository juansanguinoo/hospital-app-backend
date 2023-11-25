import Hospital from "../models/hospital.js";

const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find({}, "name img").populate(
    "user",
    "name"
  );

  res.json({
    msg: "Hospitals retrieved successfully.",
    hospitals,
  });
};

const createHospital = async (req, res) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const saveHospital = await hospital.save();

    res.json({
      msg: "Hospital created successfully.",
      hospital: saveHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

const updateHospital = async (req, res) => {
  try {
    const uid = req.params.id;

    const hospital = await Hospital.findById(uid);

    if (!hospital) {
      return res.status(404).json({
        msg: "Hospital not found.",
      });
    }

    const updateHospital = {
      ...req.body,
      user: req.uid,
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      uid,
      updateHospital,
      { new: true }
    );

    res.json({
      msg: "Hospital updated successfully.",
      hospital: updatedHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const uid = req.params.id;

    const hospital = await Hospital.findById(uid);

    if (!hospital) {
      return res.status(404).json({
        msg: "Hospital not found.",
      });
    }

    await Hospital.findByIdAndDelete(uid);

    res.json({
      msg: "Hospital deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong.",
    });
  }
};

export { createHospital, deleteHospital, getHospitals, updateHospital };
