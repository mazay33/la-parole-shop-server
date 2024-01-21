const ProductService = require("../service/productService");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

class ProductController {
  async getProducts(req, res, next) {
    try {
      const products = await ProductService.getProducts();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProduct(id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const { name, price } = req.body;

      const { img } = req.files;
      let fileName = uuidv4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await ProductService.createProduct(name, price, fileName);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
