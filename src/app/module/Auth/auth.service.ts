import { AppError } from "../../error/AppError";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

// create new user
const createUserInFoDB = async (data: IAuth) => {
  const isUserExists = await Auth.findOne({ email: data?.email });
  let status: "Pending" | "Active" | undefined;
  if (isUserExists) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This user already exists.try with another E-mail"
    );
  }

  if (data?.role === "User") {
    status = "Pending";
  }
  if (data?.role === "Agent") {
    status = "Pending";
  }

  
  data.accountStatus = status;
  const res = await Auth.create(data);
  return res;
};

// get user
const getUser = async (query: Partial<IAuth>) => {
  const filter: Record<string, any> = {};

  if (query.role) filter.role = query.role;
  if (query.accountStatus) filter.accountStatus = query.accountStatus;
  if (query.number) filter.number = query.number;

  return await Auth.find(filter).sort({ createAt: -1 });
};

// get single user
const getSingleUser = async (id: string) => {
  const res = await Auth.findById(id);
  return res;
};

// login user
const loginUser = async (data: Partial<IAuth>) => {
  const isUserExists = await Auth.findOne({ email: data?.email });
  if (!isUserExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "You don't have any account,Registration now"
    );
  }
  if (isUserExists?.accountStatus==="Block") {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Your Account is Blocked.Please contact with Admin"
    );
  }

  const isPassMatch = await bcrypt.compare(
    data?.password as string,
    isUserExists?.password
  );

  if (!isPassMatch) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wrong password");
  }
  const userInfo = {
    userId: isUserExists?._id,
    name: isUserExists?.name,
    email: isUserExists?.email,
    role: isUserExists?.role,
    number: isUserExists?.number,
  };
  const token = jwt.sign(userInfo, config.assessToken as string, {
    expiresIn: config.assessTokenExpireIn as any,
  });
  return token;
};

const updateUser = async (data: IAuth) => {

  const res = await Auth.findOneAndUpdate(
    { _id: data?.id },
    { accountStatus: data?.accountStatus }
  );

  
  return res;
};

export const authService = {
  createUserInFoDB,
  loginUser,
  getUser,
  getSingleUser,
  updateUser,
};
