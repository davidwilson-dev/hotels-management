import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    isOvernight: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

shiftSchema.index({ hotelId: 1, userId: 1 }, { unique: true });

export const Shift = mongoose.model("Shift", shiftSchema);