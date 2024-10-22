const { mongoDBConnection } = require("../dbConnection");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  birthDate: {
    type: Date,
    required: true,
  },
});

const User = mongoDBConnection.model("users", userSchema);

module.exports = User;
