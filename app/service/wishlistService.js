const prisma = require("../db");

class WishlistService {
  async getWishlistItems(userId) {
    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        wishlist_items: {
          select: {
            count: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                img: true,
              },
            },
          },
        },
      },
    });
    return wishlistItems;
  }
}

module.exports = new WishlistService();
