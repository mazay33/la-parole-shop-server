import ProductService from "../service/productService";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { ProductData } from "../@types/Product";
import ApiError from "../exceptions/apiError";

class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { sort, limit, offset } = req.query;

      const products = await ProductService.getProducts(
        sort?.toString(),
        Number(limit),
        Number(offset)
      );
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProduct(+id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        name,
        price,
        categoryId,
        subCategoryId,
        variation,
        info,
      }: ProductData = req.body;

      const { images }: any = req.files;

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

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      let {
        name,
        price,
        categoryId,
        subCategoryId,
        variation,
        info,
      }: ProductData = req.body;

      const { images }: any = req.files;

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
        +id,
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

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(+id);
      return res.json({ deleted: true, product });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
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

  async deleteFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
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

  async deleteAllFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
      const { id: userId } = req.user;
      await ProductService.deleteAllFromCart(userId);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }

  async addToWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
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

  async deleteFromWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
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

  async deleteAllFromWishlist(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw ApiError.UnauthorizedError();
      }
      const { id: userId } = req.user;
      await ProductService.deleteAllFromWishlist(userId);
      return res.json({ deleted: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
