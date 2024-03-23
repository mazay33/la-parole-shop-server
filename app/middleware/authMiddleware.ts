import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError";
import tokenService from "../service/tokenService";
import { UserPayloadData } from "../@types/User";
import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: UserPayloadData;
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(
      accessToken
    ) as UserPayloadData;

    if (!userData) {
      return next(ApiError.UnauthorizedError("Invalid access token"));
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
