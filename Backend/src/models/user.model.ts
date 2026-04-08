import mongoose, { Schema, type Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Interface for User Document
interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  urls: mongoose.Types.ObjectId[];
  accessToken?: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    urls: [
      {
        type: Schema.Types.ObjectId,
        ref: "URL",
      }
    ],
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    }
  },
  { timestamps: true }
);

// Password Hashing Using Bcrypt.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next;
})

// Password Verification
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

// JWT Token Generation
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string
    }
  )
}
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string
    }
  )
}

export const User = mongoose.model('User', userSchema);
