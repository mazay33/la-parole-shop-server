import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CartService {
  async getCartItems(userId: number) {
    const cartItems = await prisma.cart.findMany({
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
}

export default new CartService();
