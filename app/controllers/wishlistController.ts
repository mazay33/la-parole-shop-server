import { NextFunction, Request, Response } from "express";

import WishlistService from "../service/wishlistService";
import ApiError from "../exceptions/apiError";

class WishlistController {
  async getWishlistItems(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(ApiError.UnauthorizedError());
    const { id } = req.user;
    try {
      const wishlistItems = await WishlistService.getWishlistItems(id);
      return res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }
}

export default new WishlistController();
