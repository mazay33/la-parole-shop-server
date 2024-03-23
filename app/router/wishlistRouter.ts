import { Router } from "express";
import wishlistController from "../controllers/wishlistController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, wishlistController.getWishlistItems);

export default router;
