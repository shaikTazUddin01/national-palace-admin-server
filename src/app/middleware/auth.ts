import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { TUser_Role } from "../module/Auth/auth.interface";
import { config } from "../config";
import { Auth } from "../module/Auth/auth.model";
import { AppError } from "../error/AppError";
import { StatusCodes } from "http-status-codes";

export const auth = (...requiredRole: TUser_Role[]) => {
  return catchAsync(async (req, res, next) => {
    const decoded = jwt.verify(
      req?.headers?.authorization as string,
      config.assessToken as string
    );

    // console.log(decoded);

    const { userId, email, role } = decoded as JwtPayload;

    const isUserExists = await Auth.findById(userId);

    if (!isUserExists) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
