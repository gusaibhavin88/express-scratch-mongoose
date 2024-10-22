const authRoute = require("express").Router();
const authController = require("../controller/authController");
const { upload } = require("../helper/multer");
const { protect } = require("../middleware/userMiddleware");

authRoute.use(protect);
authRoute.post("/signUp", upload.single("image"), authController.signUpUser);
authRoute.post("/login", authController.logInUser);

module.exports = authRoute;
