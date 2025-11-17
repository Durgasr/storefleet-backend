import express from "express";
import {
  createNewOrder,
  getSingleOrder,
  getMyOrders,
  getAllPlacedOrders,
  getUpdateOrderDetails
} from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);

router.route("/:id").get(getSingleOrder);

router.route("/my/orders").get(auth, getMyOrders);

router.route("/orders/placed").get(getAllPlacedOrders);

router.route("/update/:id").put(getUpdateOrderDetails)

export default router;
