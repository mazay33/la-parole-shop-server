import prisma from "../db";

class SubCategoryService {
  async getSubCategories() {
    const SubCategories = await prisma.subCategory.findMany();
    return SubCategories;
  }

  async createSubCategory(
    name: string,
    categoryId: number,
    description: string
  ) {
    const SubCategory = await prisma.subCategory.create({
      data: { name, categoryId, description },
    });
    return SubCategory;
  }

  async updateSubCategory(id: number, name: string) {
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

  async deleteSubCategory(id: number) {
    const SubCategory = await prisma.subCategory.delete({
      where: { id: Number(id) },
    });
    return SubCategory;
  }
}

export default new SubCategoryService();
