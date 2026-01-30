import { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;

  name: string;
  code: string;
  status: "active" | "inactive";
  description?: string;

  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
