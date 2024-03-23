"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "../.env" });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.API_CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.static(path.resolve(__dirname, "..", "static")));
app.use(fileUpload({}));
app.use("/api", router);
// must be last
app.use(errorMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
