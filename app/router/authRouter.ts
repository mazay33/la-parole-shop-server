import { Router } from "express";
import userController from "../controllers/userController";
import { body } from "express-validator";
import checkRole from "../middleware/checkRoleMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", checkRole("ADMIN"), userController.getUsers);
router.get("/me", authMiddleware, userController.getMe);

export default router;
