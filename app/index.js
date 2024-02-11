require("dotenv").config({ path: "../.env" });
const express = require("express");
const https = require('https');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/errorMiddleware");
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(fileUpload({}));
app.use("/api", router);

// must be last
app.use(errorMiddleware);

const start = async () => {
  try {
    const options = {
      key: fs.readFileSync('private.key'),
      cert: fs.readFileSync('certificate.crt'),
    };
    
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
