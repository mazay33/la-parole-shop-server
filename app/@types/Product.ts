import { Product, ProductInfo, ProductVariation } from "@prisma/client";

export interface ProductData extends Product {
  variation: ProductVariation[]
  info: ProductInfo[]
}
