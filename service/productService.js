const ProductModel = require("../models/ProductModel");

class ProductService {
  async getProducts() {
    const products = await ProductModel.findAll();
    return products;
  }

  async getProduct(id) {
    const product = await ProductModel.findOne({ where: { id } });
    return product;
  }

  async createProduct(name, price, fileName) {
    const product = await ProductModel.create({
      name,
      price,
      img: fileName,
    });
    return product;
  }

  async deleteProduct(id) {
    const product = await ProductModel.destroy({ where: { id } });
    return product;
  }
}

module.exports = new ProductService();
