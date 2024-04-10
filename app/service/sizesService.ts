import prisma from "../db";

class SizesService {
  async getSizes() {
    const cup_sizes = await prisma.cupSize.findMany();
    const clothing_sizes = await prisma.clothingSize.findMany();
    const underbust_sizes = await prisma.underbustSize.findMany();

    return {
      cup_sizes,
      clothing_sizes,
      underbust_sizes,
    };
  }
}

export default new SizesService();
