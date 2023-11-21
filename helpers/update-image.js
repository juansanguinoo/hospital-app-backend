import fs from "fs";
import Doctor from "../models/doctor.js";

const updateImage = async (model, id, fileName) => {
  switch (model) {
    case "doctors":
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return false;
      }

      const oldPath = `./uploads/doctors/${doctor.img}`;

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      doctor.img = fileName;

      await doctor.save();
      return true;
    case "hospitals":
      break;
    case "users":
      break;
  }
};

export { updateImage };
