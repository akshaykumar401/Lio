import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { User } from "../models/user.model.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";


// interface for extending request
declare module "express" {
  interface Request {
    user?: any;
  }
}


export const verifyJWT = asyncHandler(async (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
      throw new ApiError(401, "Invalide Access Token")
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalide Access Token")
  }

})
