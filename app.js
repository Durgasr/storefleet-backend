import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import productRoutes from "./src/product/routes/product.routes";
import userRoutes from "./src/user/routes/user.routes";
import orderRoutes from "./src/order/routes/order.routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const configPath = path.resolve("config", "uat.env");
dotenv.config({ path: configPath });

const app = express();
app.use(express.json());
app.use(cookieParser());

// configure routes
app.use("/api/storefleet/product", productRoutes);
app.use("/api/storefleet/user", userRoutes);
app.use("/api/storefleet/order", orderRoutes);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
