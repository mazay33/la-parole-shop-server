const CartCService = require("../service/cartService");


class CartController {
  async getCartItems(req, res, next) {
    const { userId } = req.body;
    try {
      const cartItems = await CartCService.getCartItems(userId);
      return res.json(cartItems);
    } catch (error) {
      next(error);
    }
  }


}

module.exports = new CartController();
