const SubCategoryService = require("../service/subCategoryService");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

class SubCategoryController {
  async getSubCategories(req, res, next) {
    try {
      const subCategories = await SubCategoryService.getSubCategories();
      return res.json(subCategories);
    } catch (error) {
      next(error);
    }
  }

  async createSubCategory(req, res, next) {
    try {
      const { name, categoryId, description } = req.body;
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

  async updateSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const SubCategory = await SubCategoryService.updateSubCategory(id, name);
      return res.json(SubCategory);
    } catch (error) {
      next(error);
    }
  }

  async deleteSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      const SubCategory = await SubCategoryService.deleteSubCategory(id);
      return res.json(SubCategory);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SubCategoryController();
