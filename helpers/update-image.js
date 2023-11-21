import fs from "fs";
import Doctor from "../models/doctor.js";
import Hospital from "../models/hospital.js";
import User from "../models/user.js";

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (model, id, fileName) => {
  let oldPath = "";

  switch (model) {
    case "doctors":
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;

      deleteImage(oldPath);

      doctor.img = fileName;

      await doctor.save();
      return true;
    case "hospitals":
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;

      deleteImage(oldPath);

      hospital.img = fileName;

      await hospital.save();
      return true;
    case "users":
      const user = await User.findById(id);

      if (!user) {
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;

      deleteImage(oldPath);

      user.img = fileName;

      await user.save();
      return true;
  }
};

export { updateImage };
