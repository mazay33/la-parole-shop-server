import prisma from "../db";

class CategoryService {
  async getCategories() {
    const categories = await prisma.category.findMany({
      include: {
        sub_categories: true,
      },
    });
    return categories;
  }

  async createCategory(name: string) {
    const category = await prisma.category.create({ data: { name } });
    return category;
  }

  async updateCategory(id: number, name: string) {
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

  async deleteCategory(id: number) {
    const category = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return category;
  }
}

export default new CategoryService();
