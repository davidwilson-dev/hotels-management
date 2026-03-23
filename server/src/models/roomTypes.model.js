import mongoose from "mongoose";

import { BED_TYPES } from "#/constants/enum.constant.js";

const roomTypeSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: null
    },

    capacity: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, default: 0, min: 0 }
    },

    bedConfig: [
      {
        type: {
          type: String,
          enum: BED_TYPES,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    sizeSquareMeter: {
      type: Number,
      default: null
    },

    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: null },
        sortOrder: { type: Number, default: 0 }
      }
    ]
  },
  {
    timestamps: true
  }
);

roomTypeSchema.index({ hotelId: 1, code: 1 }, { unique: true });

export const RoomType = mongoose.model("RoomType", roomTypeSchema);