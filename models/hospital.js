import { Schema, model } from "mongoose";

const HospitalSchema = Schema({
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
});

export default model("Hospital", HospitalSchema);
