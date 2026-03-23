import mongoose from "mongoose";

import { PAYMENT_METHODS, PAYMENT_TYPES } from "#/constants/enum.constant.js";

const bookingPaymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },



    paymentCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    method: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true
    },

    type: {
      type: String,
      enum: PAYMENT_TYPES,
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: "EUR"
    },

    transactionRef: {
      type: String,
      default: null
    },

    paidAt: {
      type: Date,
      default: null,
      index: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    notes: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

bookingPaymentSchema.index({ hotelId: 1, paidAt: 1 });

export const BookingPayment = mongoose.model("BookingPayment", bookingPaymentSchema);