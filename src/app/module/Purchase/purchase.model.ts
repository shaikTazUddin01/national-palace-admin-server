import { model, Schema } from "mongoose";
import { IPurchase } from "./purchase.interface";

const purchaseSchema = new Schema<IPurchase>(
  {
    supplierName: {
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

    purchasePrice: {
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

    paymentMethod: {
      type: String,
      enum: ["CASH", "BKASH", "NAGAD", "BANK"],
      default: null,
    },

    purchaseStatus: {
      type: String,
      enum: ["PAID", "DUE"],
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

export const Purchase = model<IPurchase>("Purchase", purchaseSchema);
