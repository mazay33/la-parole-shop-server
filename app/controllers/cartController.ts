import { Request, Response, NextFunction } from "express";
import CartService from "../service/cartService";
import ApiError from "../exceptions/apiError";

class CartController {
  async getCartItems(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(ApiError.UnauthorizedError());
    const { id } = req.user;

    try {
      const cartItems = await CartService.getCartItems(id);
      res.json(cartItems);
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
