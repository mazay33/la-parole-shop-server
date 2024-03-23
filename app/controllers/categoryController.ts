import { NextFunction, Request, Response } from "express";
import CategoryService from "../service/categoryService";
import { Category } from "@prisma/client";

class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(
    req: Request<{ name: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name }: Category = req.body;
      const category = await CategoryService.createCategory(name);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { name }: Category = req.body;
      const category = await CategoryService.updateCategory(+id, name);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(+id);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
