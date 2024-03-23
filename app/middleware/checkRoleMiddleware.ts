import tokenService from "../service/tokenService";
import ApiError from "../exceptions/apiError";
import { NextFunction, Request, Response } from "express";
import { UserPayloadData } from "../@types/User";
import { Role } from "@prisma/client";

export default function (role: Role) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const userData = tokenService.validateAccessToken(accessToken) as UserPayloadData;
      if (userData.role !== role) {
        return next(ApiError.ForbiddenError());
      }
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
}
