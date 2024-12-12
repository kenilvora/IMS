const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/database");
const userRoutes = require("./routes/userRoute");
const internshipRoutes = require("./routes/internshipRoute");
const collegeRoutes = require("./routes/collegeRoutes");
require("dotenv").config();
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
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
