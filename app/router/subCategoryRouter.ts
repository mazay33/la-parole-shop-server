import { Router } from "express";
import subCategoryController from "../controllers/subCategoryController";
import checkRole from "../middleware/checkRoleMiddleware";

const router = Router();

router.get("/", subCategoryController.getSubCategories);
router.put("/:id", checkRole("ADMIN"), subCategoryController.updateSubCategory);
router.post("/", checkRole("ADMIN"), subCategoryController.createSubCategory);
router.delete(
  "/:id",
  checkRole("ADMIN"),
  subCategoryController.deleteSubCategory
);

export default router;
