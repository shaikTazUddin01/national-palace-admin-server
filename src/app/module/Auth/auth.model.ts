/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { IAuth } from "./auth.interface";
import { config } from "../../config";
import bcrypt from "bcrypt";
const authSchema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Admin", "Agent"], required: true },
  accountStatus: {
    type: String,
    enum: ["Active", "Block", "Pending", "Verified", "Reject"],
  },
});

authSchema.pre("save", async function () {
  const user = this;

  // prevent double hash on update/save
  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, Number(config.saltRounds));
});

authSchema.set(
  "toJSON",
  {
    transform: function (doc, ret: Partial<IAuth>) {
      delete ret.password;
      return ret;
    },
  },
  {
    timestamps: true,
  },
);

export const Auth = model<IAuth>("User", authSchema);
