import { Types } from "mongoose";

export type TPaymentMethod = "CASH" | "BKASH" | "NAGAD" | "BANK";

export interface IPurchase {
  _id?: Types.ObjectId;

  supplierName: string;
  productName: string;

  quantity: number;
  purchasePrice: number; // per unit

  totalAmount: number; // quantity * purchasePrice
  paidAmount: number;
  dueAmount: number;

  paymentMethod?: TPaymentMethod | null;
  purchaseStatus: "PAID" | "DUE";

  note?: string;

  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
