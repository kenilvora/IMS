import mongoose from "mongoose";
import { otpTemplate } from "../mail/otpTemplate.js";
import { mailSender } from "../utils/mailSender.js";

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expire_at: {
    type: Date,
    default: () => Date.now() + 5 * 60 * 1000,
    expires: 0,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from Internship Hub",
      otpTemplate(otp)
    );
    console.log("Email sent successfully, ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending OTP mail ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

export default mongoose.model("Otp", otpSchema);
