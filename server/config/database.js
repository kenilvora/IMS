import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to Database Successfully");
    })
    .catch((err) => {
      console.log("Error while connecting to Database");
      console.error(err);
      process.exit(1);
    });
};
