const prisma = require("../db");

class CategoryService {
  async getCategories() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async createCategory(name) {
    const category = await prisma.category.create({ data: { name } });
    return category;
  }

  async updateCategory(id, name) {
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    return category;
  }

  async deleteCategory(id) {
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return category;
  }
}

module.exports = new CategoryService();
