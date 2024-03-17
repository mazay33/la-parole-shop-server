const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Define your seed data
    const categories = [
      {
        name: "Комплекты",
      },
      {
        name: "Бюстгальтеры",
      },
      {
        name: "Трусики",
      },
      {
        name: "Аксессуары",
      },
    ];

    const subCategories = [
      {
        name: "BESTSELLERS",
        categoryId: 1,
        description: "",
      },
      {
        name: "БАЗОВЫЕ КОМПЛЕКТЫ",
        categoryId: 1,
        description: "",
      },
      {
        name: "КРУЖЕВНОЕ БЕЛЬЕ",
        categoryId: 1,
        description: "",
      },
      {
        name: "ЧЕРНОЕ БЕЛЬЕ",
        categoryId: 1,
        description: "",
      },
      {
        name: "ТЕЛЕСНОЕ БЕЛЬЕ",
        categoryId: 1,
        description: "",
      },
      {
        name: "НЕЖНОЕ БЕЛЬЕ",
        categoryId: 1,
        description: "",
      },
      {
        name: "КРАСНОЕ БЕЛЬЕ",
        categoryId: 1,
        description: "",
      },
      {
        name: "БЕЛЬЕ ДЛЯ СВИДАНИЙ",
        categoryId: 1,
        description: "",
      },
      {
        name: "КЛАССИЧЕСКАЯ ЧАШКА",
        categoryId: 2,
        description: "",
      },
      {
        name: "УКОРОЧЕННАЯ ЧАШКА",
        categoryId: 2,
        description: "",
      },
      {
        name: "БАЛКОНЕТ",
        categoryId: 2,
        description: "",
      },
      {
        name: "КОРСЕТ",
        categoryId: 2,
        description: "",
      },
      {
        name: "СТРИНГИ",
        categoryId: 3,
        description: "",
      },
      {
        name: "СТРИНГИ НА РЕГУЛЯТОРАХ",
        categoryId: 3,
        description: "",
      },
      {
        name: "БРАЗИЛЬЯНО",
        categoryId: 3,
        description: "",
      },
      {
        name: "БРАЗИЛЬЯНО НА РЕГУЛЯТОРАХ",
        categoryId: 3,
        description: "",
      },
      {
        name: "ВЫСОКИЕ",
        categoryId: 3,
        description: "",
      },
      {
        name: "КРУЖЕВНЫЕ",
        categoryId: 3,
        description: "",
      },
      {
        name: "ПОЯСА",
        categoryId: 4,
        description: "",
      },

    ];

    const existingCategories = await prisma.category.findMany();

    // Seed the users
    if (existingCategories.length === 0) {
      // Seed the categories
      for (const category of categories) {
        await prisma.category.create({
          data: category,
        });
      }
    }

    const existingSubCategories = await prisma.subCategory.findMany();

    // If subcategories exist, do not create them again
    if (existingSubCategories.length === 0) {
      // Seed the subcategories
      for (const subCategory of subCategories) {
        await prisma.subCategory.create({
          data: subCategory,
        });
      }
    }

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
