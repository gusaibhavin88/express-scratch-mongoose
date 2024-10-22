const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.protect = async (req, resp, next) => {
  try {
    const token = req.headers.authorization || req.headers.token;
    if (token) {
      const Authorization = token.split(" ")[1];
      const decodedUserData = jwt.verify(
        Authorization,
        process.env.JWT_User_SECRET_KEY
      );

      const user = await User.findById(decodedUserData._id)
        .select("-password")
        .lean();

      if (!user) throw Error("Un authorized user");
      req.user = user;
      next();
    }
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
