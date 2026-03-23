import mongoose from "mongoose";

import { DAYS_OF_WEEK, PRICE_RULE_TYPES } from "#/constants/enum.constant.js";

const roomPriceSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },
 
    roomTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
      index: true,
    },
 
    name: {
      type: String,
      required: true,
      trim: true,
    },
 
    type: {
      type: String,
      enum: PRICE_RULE_TYPES,
      required: true,
      index: true,
    },
 
    priority: {
      type: Number,
      required: true,
    },
 
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
 
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "EUR",
    },

    startDate: {
      type: Date,
      default: null,
      index: true,
    },
 
    endDate: {
      type: Date,
      default: null,
      index: true,
    },
 
    recurrence: {
      yearly: {
        type: Boolean,
        default: false,
      },

      daysOfWeek: {
        type: [Number],
        enum: DAYS_OF_WEEK,
        default: [],
        validate: {
          validator(v) {
            return v.every((d) => DAYS_OF_WEEK.includes(d));
          },
          message: "daysOfWeek must contain values between 0 (Sun) and 6 (Sat)",
        },
      },
    },

    adjustment: {
      type: Number,
      default: 0,
    },
 
    adjustmentPercent: {
      type: Number,
      default: 0,
    },
 
    description: {
      type: String,
      default: null,
    },
 
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
 
export const RoomPrice = mongoose.model("RoomPrice", roomPriceSchema);