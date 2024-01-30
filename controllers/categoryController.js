const CategoryService = require("../service/categoryService");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const categories = await CategoryService.getCategories();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await CategoryService.createCategory(name);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await CategoryService.updateCategory(id, name);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryService.deleteCategory(id);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
