const userRoute = require("express").Router();
const authController = require("../controller/authController");
const { upload } = require("../helper/multer");
const { protect } = require("../middleware/userMiddleware");

userRoute.use(protect);
userRoute.get("/list", authController.listUsers);
userRoute.get("/:id", authController.getUser);

module.exports = userRoute;
