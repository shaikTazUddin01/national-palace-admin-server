import { Types } from "mongoose";

export interface ISale {
  _id?: Types.ObjectId;

  date: Date;
  invoiceNo: string;

  customerName: string;
  customerNumber: string;
  productName: string;

  quantity: number;
  unitPrice: number;

  totalAmount: number;
  paidAmount: number;
  dueAmount: number;

  paymentStatus: "PAID" | "PARTIAL" | "DUE";

  note?: string;

  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
