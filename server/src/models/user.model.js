import mongoose from "mongoose";

import { USER_ROLES } from "#/constants/enum.constant.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: USER_ROLES,
      trim: true
    },

    emailVerified: {
      type: Boolean,
      default: false
    },

    passwordChangedAt: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: false
    },

    lastLoginAt: {
      type: Date,
      default: null
    },

    lastLoginIp: {
      type: String,
      default: null
    },

    deletedAt: {
      type: Date,
      default: null
    }

  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema);