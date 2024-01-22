const { Category } = require("../models/ProductModel");

class CategoryService {
  async getCategories() {
    const categories = await Category.findAll();
    return categories;
  }

  async createCategory(name) {
    const category = await Category.create({ name });
    return category;
  }

  async updateCategory(id, name) {
    const category = await Category.update({ name }, { where: { id } });
    return category;
  }

  async deleteCategory(id) {
    const category = await Category.destroy({ where: { id } });
    return category;
  }
}

module.exports = new CategoryService();
