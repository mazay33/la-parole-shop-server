import { Router } from "express";
import userController from "../controllers/userController";
import { body } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";
import checkRole from "../middleware/checkRoleMiddleware";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", authMiddleware, userController.refresh);
router.get("/users", checkRole("ADMIN"), userController.getUsers);

export default router;
