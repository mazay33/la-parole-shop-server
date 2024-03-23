import { Product, ProductInfo, ProductVariation } from "@prisma/client";

export interface ProductData extends Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  subCategoryId: number;
  images: string[];
  variation: ProductVariation[]
  info: ProductInfo[]
}
