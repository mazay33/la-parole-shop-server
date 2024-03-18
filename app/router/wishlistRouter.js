const Router = require("express");
const router = new Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, wishlistController.getWishlistItems);

module.exports = router;
