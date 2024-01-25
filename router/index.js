const Router = require("express");
const router = new Router();
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const cartRouter = require("./cartRouter");

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);

module.exports = router;
