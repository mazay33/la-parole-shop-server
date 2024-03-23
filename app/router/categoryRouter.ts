import { Router } from "express";
import categoryController from "../controllers/categoryController";
import checkRole from "../middleware/checkRoleMiddleware";

const router = Router();

router.get("/", categoryController.getCategories);
router.put("/:id", checkRole("ADMIN"), categoryController.updateCategory);
router.post("/", checkRole("ADMIN"), categoryController.createCategory);
router.delete("/:id", checkRole("ADMIN"), categoryController.deleteCategory);

export default router;
