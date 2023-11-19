import "dotenv/config";

import express from "express";
import connectDB from "./database/config.js";
import cors from "cors";

const app = express();

app.use(cors());

connectDB();

app.get("/", (request, response) => {
  response.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
