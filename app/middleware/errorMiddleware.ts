import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError";

export default function (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    console.error(err);
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  console.error(err);

  return res.status(500).json({ message: "Something went wrong", err });
}
