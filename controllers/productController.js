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
      let { name, price, categoryId, subCategoryId, info } = req.body;

      // Destructuring the 'images' property from the request files
      const { images } = req.files;

      // Array to store the filenames
      let fileNames = [];

      // Generating a unique filename using uuidv4
      let fileName = uuidv4() + ".jpg";

      // Checking if the 'images' is an array or not
      if (Array.isArray(images)) {
        // If 'images' is an array, iterate through each image and move it to the specified path
        images.forEach((img) => {
          img.mv(path.resolve(__dirname, "..", "static", fileName)); // Move the image to the specified path
          fileNames.push(fileName); // Add the filename to the array
        });
      } else {
        // If 'images' is not an array, move the image to the specified path
        images.mv(path.resolve(__dirname, "..", "static", fileName));
        fileNames.push(fileName); // Add the filename to the array
      }

      const product = await ProductService.createProduct(
        name,
        price,
        categoryId,
        subCategoryId,
        fileNames
      );

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      let { name, price, categoryId, subCategoryId, info } = req.body;

      // Destructuring the 'images' property from the request files
      const { images } = req.files;

      // Array to store the filenames
      let fileNames = [];

      // Generating a unique filename using uuidv4
      let fileName = uuidv4() + ".jpg";

      // Checking if the 'images' is an array or not
      if (Array.isArray(images)) {
        // If 'images' is an array, iterate through each image and move it to the specified path
        images.forEach((img) => {
          img.mv(path.resolve(__dirname, "..", "static", fileName)); // Move the image to the specified path
          fileNames.push(fileName); // Add the filename to the array
        });
      } else {
        // If 'images' is not an array, move the image to the specified path
        images.mv(path.resolve(__dirname, "..", "static", fileName));
        fileNames.push(fileName); // Add the filename to the array
      }

      const product = await ProductService.updateProduct(
        id,
        name,
        price,
        categoryId,
        subCategoryId,
        fileNames
      );

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
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
      const { userId, productId, count } = req.body;
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
}

module.exports = new ProductController();
