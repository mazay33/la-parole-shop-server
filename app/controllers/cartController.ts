import { Request, Response, NextFunction } from "express";
import CartService from "../service/cartService";
import ApiError from "../exceptions/apiError";

class CartController {
  async getCartItems(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(ApiError.UnauthorizedError());
    const { id } = req.user;

    try {
      const cartItems = await CartService.getCartItems(id);
      res.json(cartItems?.cart_items || []);
    } catch (error) {
      next(error);
    }
  }

  async getCartItemsCount(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(ApiError.UnauthorizedError());
    const { id } = req.user;

    try {
      const cartItemsCount = await CartService.getCartItemsCount(id);
      res.json({ count: cartItemsCount?._count.cart_items || 0 });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
      const { id: userId } = req.user;
      await CartService.deleteAllFromCart(userId);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
