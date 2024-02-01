const CartService = require("../service/cartService");


class CartController {
  async getCartItems(req, res, next) {
    const { id } = req.user;

    try {
      const cartItems = await CartService.getCartItems(id);
      return res.json(cartItems);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
