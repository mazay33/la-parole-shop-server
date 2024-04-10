import { Router } from "express";
import cartController from "../controllers/cartController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, cartController.getCartItems);
router.get("/count", authMiddleware, cartController.getCartItemsCount);

export default router;
