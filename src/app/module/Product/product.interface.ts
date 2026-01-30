import { Types } from "mongoose";

export interface IProduct {
  id?: Types.ObjectId;

  // from your Create Product form
  name: string;
  category: string;
  sku: string;
  purchasePrice: number;
  salePrice: number;
  quantity: number;

  // optional / system fields (matching your demo style)
  status?: "active" | "inactive";
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
