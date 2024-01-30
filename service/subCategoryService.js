const prisma = require("../db");

class SubCategoryService {
  async getSubCategories() {
    const SubCategories = await prisma.subCategory.findMany();
    return SubCategories;
  }

  async createSubCategory(name, categoryId, description) {
    const SubCategory = await prisma.subCategory.create({
      data: { name, categoryId, description },
    });
    return SubCategory;
  }

  async updateSubCategory(id, name) {
    const SubCategory = await prisma.subCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    return SubCategory;
  }

  async deleteSubCategory(id) {
    const SubCategory = await prisma.subCategory.delete({
      where: { id: Number(id) },
    });
    return SubCategory;
  }
}

module.exports = new SubCategoryService();
