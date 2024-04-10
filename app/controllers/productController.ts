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
        sub_categories,
        variation,
        info,
        underbust_sizes,
        clothing_sizes,
        cup_sizes,
      }: ProductData = req.body;

      if(sub_categories){
        // @ts-ignore
        sub_categories = JSON.parse(sub_categories);
      }

      if (cup_sizes) {
        // @ts-ignore
        cup_sizes = JSON.parse(cup_sizes);
      }

      if (clothing_sizes) {
        // @ts-ignore
        clothing_sizes = JSON.parse(clothing_sizes);
      }

      if (underbust_sizes) {
        // @ts-ignore
        underbust_sizes = JSON.parse(underbust_sizes);
      }

      const images = req.files?.images;

      let fileNames = [];

      if (Array.isArray(images)) {
        images.forEach((img) => {
          let fileName = uuidv4() + ".jpg";
          img.mv(path.resolve(__dirname, "../..", "static", fileName));
          fileNames.push(fileName);
        });
      } else {
        let fileName = uuidv4() + ".jpg";
        images?.mv(path.resolve(__dirname, "../..", "static", fileName));
        fileNames.push(fileName);
      }

      const product = await ProductService.createProduct(
        name,
        price,
        categoryId,
        sub_categories,
        fileNames,
        variation,
        info,
        underbust_sizes,
        clothing_sizes,
        cup_sizes
      );

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  // async updateProduct(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     let {
  //       name,
  //       price,
  //       categoryId,
  //       subCategoryId,
  //       variation,
  //       info,
  //       clothing_sizes,
  //       underbust_sizes,
  //       cup_sizes,
  //     }: ProductData = req.body;

  //     if(clothing_sizes && typeof clothing_sizes === "string") {
  //       // @ts-ignore
  //       clothing_sizes = JSON.parse(clothing_sizes);
  //     }

  //     if(underbust_sizes && typeof underbust_sizes === "string") {
  //       // @ts-ignore
  //       underbust_sizes = JSON.parse(underbust_sizes);
  //     }

  //     if(cup_sizes && typeof cup_sizes === "string") {
  //       // @ts-ignore
  //       cup_sizes = JSON.parse(cup_sizes);
  //     }

  //     const images = req.files?.images;

  //     let fileNames = [];

  //     if (Array.isArray(images)) {
  //       let fileName = uuidv4() + ".jpg";
  //       images.forEach((img) => {
  //         img.mv(path.resolve(__dirname, "../..", "static", fileName));
  //         fileNames.push(fileName);
  //       });
  //     } else {
  //       let fileName = uuidv4() + ".jpg";
  //       images?.mv(path.resolve(__dirname, "../..", "static", fileName));
  //       fileNames.push(fileName);
  //     }

  //     const product = await ProductService.updateProduct(
  //       +id,
  //       name,
  //       price,
  //       categoryId,
  //       subCategoryId,
  //       fileNames,
  //       variation,
  //       info,
  //       clothing_sizes,
  //       underbust_sizes,
  //       cup_sizes
  //     );

  //     return res.json(product);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

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
