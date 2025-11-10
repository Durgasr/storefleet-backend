import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

const configPath = path.resolve("config", "uat.env");
dotenv.config({ path: configPath });

const app = express();
app.use(express.json());
app.use(cookieParser());



export default app;
