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
    return cartItems;
  }

  async getCartItemsCount(userId: number) {
    const cartItemsCount = await prisma.cart.findFirst({
      where: { userId },
      include: {
        _count: true,
      }
    });
    return cartItemsCount;
  }
}

export default new CartService();
