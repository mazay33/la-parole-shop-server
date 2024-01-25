const prisma = require("../db");

class CartService {
  async getCartItems(userId) {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        cart_items: {
          select  : {
            count: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                img: true
              }
            }
          }
        }
      },
    });
    return cartItems;
  }
}

module.exports = new CartService();
