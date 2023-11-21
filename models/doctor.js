import { Schema, model } from "mongoose";

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

export default model("Doctor", DoctorSchema);
