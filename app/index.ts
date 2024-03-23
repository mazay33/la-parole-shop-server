require("dotenv").config({ path: "../.env" });
import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middleware/errorMiddleware";
import path from "path";

const app: Express = express();
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

async function startServer(
  port: number = Number(process.env.PORT) || 5000
): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      const server = app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        resolve();
      });
      server.on("error", reject);
    });
  } catch (e) {
    console.log(e);
  }
}

startServer();
