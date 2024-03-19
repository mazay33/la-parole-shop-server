const ProductService = require("../service/productService");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

class ProductController {
  async getProducts(req, res, next) {
    try {
      const { sort, limit, offset } = req.query;
      const products = await ProductService.getProducts(sort, limit, offset);
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
      let { name, price, categoryId, subCategoryId, variation, info } =
        req.body;

      const { images } = req.files;

      let fileNames = [];

      if (Array.isArray(images)) {
        images.forEach((img) => {
          let fileName = uuidv4() + ".jpg";
          img.mv(path.resolve(__dirname, "../..", "static", fileName));
          fileNames.push(fileName);
        });
      } else {
        let fileName = uuidv4() + ".jpg";
        images.mv(path.resolve(__dirname, "../..", "static", fileName));
        fileNames.push(fileName);
      }

      const product = await ProductService.createProduct(
        name,
        price,
        categoryId,
        subCategoryId,
        fileNames,
        variation,
        info
      );

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      let { name, price, categoryId, subCategoryId, variation, info } =
        req.body;

      const { images } = req.files;

      let fileNames = [];

      if (Array.isArray(images)) {
        let fileName = uuidv4() + ".jpg";
        images.forEach((img) => {
          img.mv(path.resolve(__dirname, "../..", "static", fileName));
          fileNames.push(fileName);
        });
      } else {
        let fileName = uuidv4() + ".jpg";
        images.mv(path.resolve(__dirname, "../..", "static", fileName));
        fileNames.push(fileName);
      }

      const product = await ProductService.updateProduct(
        id,
        name,
        price,
        categoryId,
        subCategoryId,
        fileNames,
        variation,
        info
      );

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      return res.json({ deleted: true, product });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId, count } = req.body;
      const cartProduct = await ProductService.addToCart(
        userId,
        productId,
        count
      );
      return res.json(cartProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteFromCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.body;
      const cartProduct = await ProductService.deleteFromCart(
        userId,
        productId
      );
      return res.json(cartProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllFromCart(req, res, next) {
    try {
      const { id: userId } = req.user;
      await ProductService.deleteAllFromCart(userId);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  async addToWishlist(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId, count } = req.body;
      const wishlistProduct = await ProductService.addToWishlist(
        userId,
        productId,
        count
      );
      return res.json(wishlistProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteFromWishlist(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.body;
      const wishlistProduct = await ProductService.deleteFromWishlist(
        userId,
        productId
      );
      return res.json(wishlistProduct);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllFromWishlist(req, res, next) {
    try {
      const { id: userId } = req.user;
      await ProductService.deleteAllFromWishlist(userId);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
