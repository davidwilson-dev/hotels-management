import mongoose from "mongoose";

import { JOB_TITLES } from "#/constants/enum.constant.js";

const staffProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },

    employeeCode: {
      type: String,
      required: true,
      trim: true
    },

    name: {
      type: String,
      required: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    address: {
      type: String,
      default: ""
    },

    idCardNumber: {
      type: String,
      default: ""
    },

    phoneNumber: {
      type: String,
      default: ""
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other"
    },

    jobTitle: {
      type: String,
      enum: JOB_TITLES,
      required: true,
      trim: true
    },

    department: {
      type: String,
      default: null
    },

    hiredAt: {
      type: Date,
      default: Date.now
    },

    terminatedAt: {
      type: Date,
      default: null
    },

    avatarUrl: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    } 
  },
  {
    timestamps: true
  }
)

export const StaffProfile = mongoose.model("StaffProfile", staffProfileSchema);
