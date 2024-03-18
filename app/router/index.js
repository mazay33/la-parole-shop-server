const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const cartRouter = require("./cartRouter");
const wishlistRouter = require("./wishlistRouter");
const subCategoryRouter = require("./subCategoryRouter");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/sub-category", subCategoryRouter);

module.exports = router;
