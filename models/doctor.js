import { Schema, model } from "mongoose";

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

export default model("Doctor", DoctorSchema);
