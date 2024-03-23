import userService from "../service/userService";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";

class userController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation error", errors.array() as never[])
        );
      }
      const { email, password, role }: User = req.body;
      const user = await userService.registration(email, password, role);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      res.cookie("accessToken", user.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: User = req.body;
      const user = await userService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      res.cookie("accessToken", user.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return next(ApiError.BadRequest("No refresh token provided"));
      }

      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
      });
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL!);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new userController();
