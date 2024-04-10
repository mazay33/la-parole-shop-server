import { NextFunction, Request, Response } from "express";
import sizesService from "../service/sizesService";

class CategoryController {
  async getSizes(req: Request, res: Response, next: NextFunction) {
    try {
      const sizes = await sizesService.getSizes();
      return res.json(sizes);
    } catch (error) {
      next(error);
    }
  }
}


export default new CategoryController();
