const prisma = require("../db");
const ApiError = require("../exceptions/apiError");

class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true },
        },
        subCategory: {
          select: { name: true },
        },
      },
    });
    return products;
  }

  async getProduct(id) {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: {
          select: { name: true },
        },
        subCategory: {
          select: { name: true },
        },
        productInfo: true,
      },
    });
    return product;
  }

  async createProduct(name, price, categoryId, subCategoryId, fileNames) {
    const subCategory = await prisma.subCategory.findFirst({
      where: {
        id: Number(subCategoryId),
        categoryId: Number(categoryId),
      },
    });

    if (!subCategory) {
      throw ApiError.BadRequest(
        "Созданная подкатегория не принадлежит существующей категории"
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        img: fileNames,
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        subCategory: {
          connect: {
            id: Number(subCategoryId),
          },
        },
      },
    });
    return product;
  }

  async updateProduct(id, name, price, categoryId, subCategoryId, fileNames) {
    const subCategory = await prisma.subCategory.findFirst({
      where: {
        id: Number(subCategoryId),
        categoryId: Number(categoryId),
      },
    });

    if (!subCategory) {
      throw ApiError.BadRequest(
        "Созданная подкатегория не принадлежит существующей категории"
      );
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
        img: fileNames,
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        subCategory: {
          connect: {
            id: Number(subCategoryId),
          },
        },
      },
    });
    return product;
  }

  async deleteProduct(id) {
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return product;
  }

  async addToCart(userId, productId, count) {
    // Проверяем наличие данного продукта в корзине
    const existingCartProduct = await prisma.cartProduct.findFirst({
      where: {
        cart: {
          userId: Number(userId),
        },
        product: {
          id: Number(productId),
        },
      },
    });
    // Если продукт уже есть в корзине, то выбрасываем ошибку
    if (existingCartProduct) {
      throw ApiError.BadRequest("Товар уже добавлен в корзину");
    }

    // Если продукта нет в корзине, то добавляем его
    const cartProduct = await prisma.cartProduct.create({
      data: {
        count: Number(count),
        cart: {
          connect: {
            userId: Number(userId),
          },
        },
        product: {
          connect: {
            id: Number(productId),
          },
        },
      },
    });
    return cartProduct;
  }

  async deleteFromCart(userId, productId) {
    const cartProduct = await prisma.cartProduct.delete({
      where: {
        UniqueCartItem: {
          cartId: Number(userId),
          productId: Number(productId),
        },
      },
    });
    return cartProduct;
  }

  async addToWishlist(userId, productId, count) {
    const existingWishlistProduct = await prisma.wishlistProduct.findFirst({
      where: {
        wishlist: {
          userId: Number(userId),
        },
        product: {
          id: Number(productId),
        },
      },
    });

    if (existingWishlistProduct) {
      throw ApiError.BadRequest("Товар уже добавлен в избранное");
    }

    const wishlistProduct = await prisma.wishlistProduct.create({
      data: {
        count: Number(count),
        wishlist: {
          connect: {
            userId: Number(userId),
          },
        },
        product: {
          connect: {
            id: Number(productId),
          },
        },
      },
    });
    return wishlistProduct;
  }
}

module.exports = new ProductService();
