const { Product } = require("../models/ProductModel");

class ProductService {
  async getProducts() {
    const products = await Product.findAll();
    return products;
  }

  async getProduct(id) {
    const product = await Product.findOne({ where: { id } });
    return product;
  }

  async createProduct(name, price, fileName) {
    const product = await Product.create({
      name,
      price,
      img: fileName,
    });
    return product;
  }

  async updateProduct(id, name, price, fileName) {
    const product = await Product.update(
      { name, price, img: fileName },
      { where: { id } }
    );
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.destroy({ where: { id } });
    return product;
  }
}

module.exports = new ProductService();
