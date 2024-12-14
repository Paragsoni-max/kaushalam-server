import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRoutes);
app.use("/api/todos", todoRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
