import mongoose from "mongoose";

import { HOTEL_STATUSES } from "#/constants/enum.constant.js";

const hotelSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },

    status: {
      type: String,
      enum: HOTEL_STATUSES,
      default: "active",
      index: true
    },

    address: {
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true, index: true },
      district: { type: String, required: true, trim: true, index: true },
      ward: { type: String, default: null, trim: true },
      street: { type: String, required: true, trim: true },
      fullAddress: { type: String, required: true, trim: true }
    },

    contact: {
      phone: { type: String, default: null },
      email: { type: String, default: null, lowercase: true, trim: true }
    },

    coordinates: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null }
    },

    totalRoomLimit: {
      type: Number,
      required: true,
      min: 1
    },

    totalStaffLimit: {
      type: Number,
      required: true,
      min: 1
    },

    checkInTime: {
      type: String,
      default: "14:00"
    },

    checkOutTime: {
      type: String,
      default: "12:00"
    },

    description: {
      type: String,
      default: null
    },

    images: [
      {
        url: { type: String, required: true },
        isthumbnail: { type: Boolean, default: false },
        sortOrder: { type: Number, default: 0 }
      }
    ],
  },
  {
    timestamps: true,
  }
);

hotelSchema.index({ code: 1 }, { unique: true });
hotelSchema.index({ slug: 1 }, { unique: true });
hotelSchema.index({ "address.city": 1, "address.district": 1 });

export const Hotel = mongoose.model("Hotel", hotelSchema);