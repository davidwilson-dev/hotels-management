import mongoose from "mongoose";
import { 
  BOOKING_STATUSES, 
  PAYMENT_STATUSES, 
  BOOKING_SOURCES, 
  CHANNELS
} from "#/constants/enum.constant.js";

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true
    },

    contactSnapshot: {
      fullName: { type: String, required: true },
      email: { type: String, default: null },
      phone: { type: String, required: true }
    },

    bookingSource: {
      type: String,
      enum: BOOKING_SOURCES,
      default: "website"
    },

    channel: {
      type: String,
      enum: CHANNELS,
      default: "direct"
    },

    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "booked",
      index: true
    },

    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: "unpaid",
      index: true
    },

    bookingRoom: [
      {
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true
        },
        pricePerNight: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],

    checkInDate: {
      type: Date,
      required: true,
      index: true
    },

    checkOutDate: {
      type: Date,
      required: true,
      index: true
    },

    totalNights: {
      type: Number,
      required: true,
      min: 1
    },

    adults: {
      type: Number,
      required: true,
      min: 1
    },

    children: {
      type: Number,
      default: 0,
      min: 0
    },

    specialRequests: {
      type: String,
      default: null
    },

    notes: {
      type: String,
      default: null
    },

    pricing: {
      roomSubtotal: { type: Number, required: true, min: 0 },
      discountAmount: { type: Number, default: 0, min: 0 },
      taxAmount: { type: Number, default: 0, min: 0 },
      serviceFee: { type: Number, default: 0, min: 0 },
      totalAmount: { type: Number, required: true, min: 0 },
      currency: { type: String, default: "EUR" }
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    confirmedAt: {
      type: Date,
      default: null
    },

    cancelledAt: {
      type: Date,
      default: null
    },

    cancellationReason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ hotelId: 1, status: 1 });
bookingSchema.index({ hotelId: 1, checkInDate: 1, checkOutDate: 1 });

export const Booking = mongoose.model("Booking", bookingSchema);