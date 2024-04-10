import { Router } from "express";
import sizesController from "../controllers/sizesController";

const router = Router();

router.get("/", sizesController.getSizes);


export default router;
