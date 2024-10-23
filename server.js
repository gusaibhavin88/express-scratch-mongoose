const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const rootRouters = require("./routes/index");
dotenv.config();
require("./dbConnection");
// require("./fsModule");
// require("./fsVideo");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "*",
  cors({
    origin: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/v1", rootRouters);

app.listen(process.env.PORT, () => {
  console.log(`server is listening at ${process.env.PORT} `);
});
