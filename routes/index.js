const authRoute = require("./authRoute");

const router = require("express").Router();

router.use("/auth", authRoute);

module.exports = router;
