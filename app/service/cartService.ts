import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CartService {
  async getCartItems(userId: number) {
    const cartItems = await prisma.cart.findFirst({
      where: { userId },
      include: {
        cart_items: {
          select: {
            count: true,
            product: true,
          },
        },
      },
    });
    return cartItems;
  }

  async getCartItemsCount(userId: number) {
    const cartItemsCount = await prisma.cart.findFirst({
      where: { userId },
      include: {
        _count: true,
      },
    });
    return cartItemsCount;
  }

  async deleteAllFromCart(userId: number) {
    const cartProduct = await prisma.cartProduct.deleteMany({
      where: {
        cartId: Number(userId),
      },
    });
    return cartProduct;
  }
}

export default new CartService();
