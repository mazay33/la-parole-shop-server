const { Product } = require("../models/ProductModel");
const prisma = require("../db");

class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany();
    return products;
  }

  async getProduct(id) {
    const product = await prisma.product.findFirst({
      where: { id: Number(id) },
    });
    return product;
  }

  async createProduct(name, price, categoryId, fileName) {
    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        img: fileName,
      },
    });
    return product;
  }

  async updateProduct(id, name, price, fileName, categoryId) {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
        categoryId: Number(categoryId),
        img: fileName,
      },
    });
    return product;
  }

  async deleteProduct(id) {
    const product = await prisma.product.delete({ where: { id: Number(id) } });
    return product;
  }
}

module.exports = new ProductService();
