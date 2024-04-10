import { Router } from "express";

import authRouter from "./authRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import cartRouter from "./cartRouter";
import wishlistRouter from "./wishlistRouter";
import subCategoryRouter from "./subCategoryRouter";
import sizesRouter from "./sizesRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/sizes", sizesRouter);

export default router;
