const AuthService = require("../services/authService");
const authService = new AuthService();

// Sign Up User
exports.signUpUser = async (req, resp) => {
  try {
    const user = await authService.signUpUser(req?.body, resp, req.file);
    resp.status(200).json({
      success: false,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Login User

exports.logInUser = async (req, resp) => {
  try {
    const user = await authService.logInUser(req?.body, resp);
    resp.status(200).json({
      success: false,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Forgot Password

exports.forgotPassword = async (req, resp) => {
  try {
    await authService.forgotPassword(req?.body, resp);
    resp.status(200).json({
      success: false,
      message: "Reset password link sent to your mail",
      data: null,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password

exports.resetPassword = async (req, resp) => {
  try {
    await authService.resetPassword(req?.body, resp);
    resp.status(200).json({
      success: false,
      message: "Password reset successfully",
      data: null,
    });
  } catch (error) {
    resp.status(500).json({ success: false, message: error.message });
  }
};
