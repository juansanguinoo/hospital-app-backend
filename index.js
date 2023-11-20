import "dotenv/config";

import express from "express";
import connectDB from "./database/config.js";
import cors from "cors";

import router from "./routes/users.js";

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/users", router);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
