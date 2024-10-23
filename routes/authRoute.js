const authRoute = require("express").Router();
const authController = require("../controller/authController");
const { upload } = require("../helper/multer");
const { protect } = require("../middleware/userMiddleware");

authRoute.post("/signUp", upload.single("image"), authController.signUpUser);
authRoute.post("/login", authController.logInUser);
authRoute.post("/forgot-password", authController.forgotPassword);
authRoute.post("/reset-password", authController.resetPassword);
authRoute.use(protect);

module.exports = authRoute;
