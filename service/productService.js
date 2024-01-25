const prisma = require("../db");

class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          select: { id: true, name: true },
        },
      },
    });
    return products;
  }

  async getProduct(id) {
    const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: {
        categories: {
          select: { id: true, name: true },
        },
      },
    });
    return product;
  }

  async createProduct(name, price, categories, fileNames) {
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        categories: {
          connect: categories,
        },
        img: fileNames,
      },
      include: { categories: true },
    });
    return product;
  }

  async updateProduct(id, name, price, categories, fileNames) {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
        categories: {
          connect: categories,
        },
        img: fileNames,
      },
      include: { categories: true },
    });
    return product;
  }

  async deleteProduct(id) {
    const product = await prisma.product.delete({ where: { id: Number(id) } });
    return product;
  }

  async addToCart(userId, productId, count) {
    const cartProduct = await prisma.cartProduct.create({
      data: {
        count: Number(count),
        cart: {
          connect: {
            userId: Number(userId),
          },
        },
        product: {
          connect: {
            id: Number(productId),
          },
        },
      },
    });
    return cartProduct;
  }
}

module.exports = new ProductService();
