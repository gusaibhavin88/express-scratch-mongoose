const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../helper/mailer");
const moment = require("moment");
const { paginationObject } = require("../utility/utility");

class AuthService {
  generateToken = async (user) => {
    const token = jwt.sign(
      { _id: user?._id },
      process.env.JWT_User_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    return { token: token, ...user };
  };

  signUpUser = async (payload, resp, file) => {
    const { name, email, age, password, birthDate } = payload;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new Error("User already registered with this mail");
    }
    const formattedBirthDate = moment(birthDate);
    const bcryptPassword = await bcrypt.hash(password, 10);
    let imageUrl;
    if (file) {
      imageUrl = `/uploads/${file.filename}`;
    }
    const user = await User.create({
      name,
      email,
      age,
      birthDate: formattedBirthDate,
      password: bcryptPassword,
      image: imageUrl,
    });

    return user;
  };

  // Login User

  logInUser = async (payload, resp) => {
    const { email, password } = payload;

    const user = await User.findOne({ email }).lean();
    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    return this.generateToken(user);
  };

  // Forgot password
  forgotPassword = async (payload, resp) => {
    const { email } = payload;

    const reset_password_token = crypto.randomBytes(32).toString("hex");
    const currentTime = moment().add(15, "minutes").format();
    const encodedEmail = encodeURIComponent(email);

    const url = `${process.env.FRONT_END}/reset-password?token=${reset_password_token}&email=${encodedEmail}`;

    const hash_token = crypto
      .createHash("sha256")
      .update(reset_password_token)
      .digest("hex");

    await User.findOneAndUpdate(
      { email },
      { tokenExpires: currentTime, resetToken: hash_token }
    );
    sendEmail({ email, subject: "reset password", message: url });
  };

  // Reset password
  resetPassword = async (payload, resp) => {
    const { email, newPassword, token } = payload;

    const hash_token = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ email, resetToken: hash_token });

    if (!user) {
      throw Error("Invalid token");
    }

    const expireTime = moment(user?.tokenExpires);
    const currentTime = moment();

    if (expireTime.isAfter(currentTime)) {
      user.tokenExpires = null;
      user.isVerified = true;
      user.resetToken = null;

      user.save();
    }
  };

  // Get User
  getUser = async (params, userData, resp) => {
    const user = await User.findById(userData?._id).select("-password").lean();
    return user;
  };

  // List User
  listUser = async (searchObj, user, resp) => {
    const pagination = paginationObject(searchObj);
    const users = await User.find({})
      .skip(pagination.skip)
      .sort(pagination.sort)
      .limit(pagination.resultPerPage);

    return users;
  };
}

module.exports = AuthService;
