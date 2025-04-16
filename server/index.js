import express from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/database.js";
import userRoutes from "./routes/userRoute.js";
import internshipRoutes from "./routes/internshipRoute.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

dbConnect();
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/internship", internshipRoutes);
app.use("/api/v1/college", collegeRoutes);

const port = process.env.PORT || 4000;

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});
