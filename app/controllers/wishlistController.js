const WishlistService = require("../service/wishlistService");

class WishlistController {
  async getWishlistItems(req, res, next) {
    const { id } = req.user;
    try {
      const wishlistItems = await WishlistService.getWishlistItems(id);
      return res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WishlistController();
