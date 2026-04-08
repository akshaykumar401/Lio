import mongoose, { Schema, type Document } from "mongoose";

// Interface for OTP Document
interface IOTP extends Document {
  otp: string;
  email: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOTP>(
  {
    otp: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300
    }
  },
  { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);