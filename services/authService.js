const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  signUpUser = async (payload, resp) => {
    const { name, email, age, password, birthDate } = payload;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new Error("User already registered with this mail");
    }
    const formattedBirthDate = new Date(birthDate);
    const bcryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      age,
      birthDate: formattedBirthDate,
      password: bcryptPassword,
    });

    return user;
  };

  logInUser = async (payload, resp) => {
    const { email, password } = payload;

    const user = await User.findOne({ email }).lean();
    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    return this.generateToken(user);
  };
}

module.exports = AuthService;
