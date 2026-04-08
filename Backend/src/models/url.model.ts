import mongoose, { Schema, Document } from "mongoose";

// Interface for URL Document
interface IURL extends Document {
  urlCode: string;
  longUrl: string;
  clicks: number;
  status: "active" | "inactive";
  owner: mongoose.Types.ObjectId;
}

const urlSchema = new Schema<IURL>(
  {
    urlCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    longUrl: {
      type: String,
      required: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

export const URL = mongoose.model("URL", urlSchema);