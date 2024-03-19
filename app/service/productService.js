const prisma = require("../db");
const ApiError = require("../exceptions/apiError");

const getPaginatedData = require("../utils/getPaginatedData");

class ProductService {
  async getProducts(sort, limit, offset) {
    const products = await getPaginatedData(prisma.product, {
      sort,
      limit,
      offset,
      include: {
        category: { select: { name: true } },
        subCategory: { select: { name: true } },
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
        variations: true,
        info: true,
      },
    });
    return product;
  }

  async createProduct(
    name,
    price,
    categoryId,
    subCategoryId,
    fileNames,
    variation,
    info
  ) {
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

    if (info) {
      info = JSON.parse(info); // only for postman ??
      console.log(info);
      info.forEach(
        async (i) =>
          await prisma.productInfo.create({
            data: {
              title: i.title,
              description: i.description,
              product: {
                connect: {
                  id: product.id,
                },
              },
            },
          })
      );
    }

    if (variation) {
      variation = JSON.parse(variation); // only for postman ??
      variation.forEach(
        async (i) =>
          await prisma.productVariation.create({
            data: {
              sku: i.sku,
              price: +i.price,
              name: i.name,
              product: {
                connect: {
                  id: product.id,
                },
              },
            },
          })
      );
    }

    return {
      ...product,
      variation,
      info,
    };
  }

  async updateProduct(
    id,
    name,
    price,
    categoryId,
    subCategoryId,
    fileNames,
    variation,
    info
  ) {
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

    if (info) {
      info = JSON.parse(info); // only for postman ??
      info.forEach(
        async (i) =>
          await prisma.productInfo.update({
            where: {
              productId: product.id,
            },
            data: {
              title: i.title,
              description: i.description,
            },
          })
      );
    }

    if (variation) {
      variation = JSON.parse(variation); // only for postman ??
      variation.forEach(
        async (i) =>
          await prisma.productVariation.update({
            where: {
              productId: product.id,
            },
            data: {
              sku: i.sku,
              price: +i.price,
              name: i.name,
            },
          })
      );
    }
    return { ...product, variation, info };
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

  async deleteAllFromCart(userId) {
    const cartProduct = await prisma.cartProduct.deleteMany({
      where: {
        cartId: Number(userId),
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

  async deleteFromWishlist(userId, productId) {
    const wishlistProduct = await prisma.wishlistProduct.delete({
      where: {
        UniqueWishlistItem: {
          wishlistId: Number(userId),
          productId: Number(productId),
        },
      },
    });
    return wishlistProduct;
  }

  async deleteAllFromWishlist(userId) {
    const wishlistProduct = await prisma.wishlistProduct.deleteMany({
      where: {
        wishlistId: Number(userId),
      },
    });
    return wishlistProduct;
  }
}

module.exports = new ProductService();
