import { model, Schema } from "mongoose";
import { ISale } from "./sale.interface";

const saleSchema = new Schema<ISale>(
  {
    date: {
      type: Date,
      required: true,
    },

    invoiceNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    dueAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["PAID", "PARTIAL", "DUE"],
      required: true,
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Sale = model<ISale>("Sale", saleSchema);
