import { NextFunction, Request, Response } from "express";
import SubCategoryService from "../service/subCategoryService";
import { SubCategory } from "@prisma/client";

class SubCategoryController {
  async getSubCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const subCategories = await SubCategoryService.getSubCategories();
      return res.json(subCategories);
    } catch (error) {
      next(error);
    }
  }

  async createSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, categoryId, description }: SubCategory = req.body;
      const subCategory = await SubCategoryService.createSubCategory(
        name,
        categoryId,
        description
      );
      return res.json(subCategory);
    } catch (error) {
      next(error);
    }
  }

  async updateSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name }: SubCategory = req.body;
      const SubCategory = await SubCategoryService.updateSubCategory(
        Number(id),
        name
      );
      return res.json(SubCategory);
    } catch (error) {
      next(error);
    }
  }

  async deleteSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const SubCategory = await SubCategoryService.deleteSubCategory(
        Number(id)
      );
      return res.json(SubCategory);
    } catch (error) {
      next(error);
    }
  }
}

export default new SubCategoryController();
