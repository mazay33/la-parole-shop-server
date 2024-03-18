const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.put("/:id", checkRole("ADMIN"), productController.updateProduct);
router.post("/", checkRole("ADMIN"), productController.createProduct);
router.delete("/:id", checkRole("ADMIN"), productController.deleteProduct);

router.post("/add-to-cart", authMiddleware, productController.addToCart);
router.post(
  "/delete-from-cart",
  authMiddleware,
  productController.deleteFromCart
);

router.post(
  "/add-to-wishlist",
  authMiddleware,
  productController.addToWishlist
);

module.exports = router;
