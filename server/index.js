const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/database");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api/v1/auth", userRoutes);

const port = process.env.PORT || 4000;

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
