import mongoose from "mongoose";

import { ROOM_STATUSES } from "#/constants/enum.constant.js";
import { HOUSEKEEPING_STATUSES } from "#/constants/enum.constant.js";

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },

    roomTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
      index: true
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true
    },

    floor: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      enum: ROOM_STATUSES,
      default: "available",
      index: true
    },

    housekeepingStatus: {
      type: String,
      enum: HOUSEKEEPING_STATUSES,
      default: "clean",
      index: true
    },

    smokingAllowed: {
      type: Boolean,
      default: false
    },

    notes: {
      type: String,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

roomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });
roomSchema.index({ hotelId: 1, status: 1 });

export const Room = mongoose.model("Room", roomSchema);