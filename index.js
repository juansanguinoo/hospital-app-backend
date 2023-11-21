import "dotenv/config";

import express from "express";
import connectDB from "./database/config.js";
import cors from "cors";

import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import hospitalRouter from "./routes/hospital.js";
import doctorRouter from "./routes/doctor.js";
import searchRouter from "./routes/search.js";

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/search", searchRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
