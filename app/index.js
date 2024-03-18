require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.API_CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static(path.resolve(__dirname, "..", "static")));
app.use(fileUpload({}));
app.use("/api", router);

// must be last
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
