import { Product, ProductInfo, ProductVariation } from "@prisma/client";

export interface ProductData extends Product {
  variation: ProductVariation[]
  info: ProductInfo[]
  underbust_sizes: number[],
  cup_sizes: number[],
  clothing_sizes: number[],
}
