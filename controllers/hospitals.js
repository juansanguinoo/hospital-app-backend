import Hospital from "../models/Hospital.js";

const getHospitals = async (req, res) => {};

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

const updateHospital = async (req, res) => {};

const deleteHospital = async (req, res) => {};

export { createHospital, deleteHospital, getHospitals, updateHospital };
