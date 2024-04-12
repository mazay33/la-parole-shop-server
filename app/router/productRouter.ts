import { Router } from "express";

import productController from "../controllers/productController";
import checkRole from "../middleware/checkRoleMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
// router.put("/:id", checkRole("ADMIN"), productController.updateProduct);
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
router.post(
  "/delete-from-wishlist",
  authMiddleware,
  productController.deleteFromWishlist
);
router.post(
  "/delete-all-from-wishlist",
  authMiddleware,
  productController.deleteAllFromWishlist
);

export default router;
