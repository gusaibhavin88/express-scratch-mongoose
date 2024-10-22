const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnection = (url) => {
  const db = mongoose.createConnection(url);
  db.on("error", function (error) {
    console.log(`mongoDb error - ${error}`);
  });

  db.on("connected", function () {
    console.log(`MongoDB :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
};

const mongoDBConnection = dbConnection(process.env.MONGO_URL);

module.exports = {
  mongoDBConnection,
};
