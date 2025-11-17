import {
  createNewOrderRepo,
  getOrder,
  myOrders,
  allPlacedOrders,
  updateOrderDetails,
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const user = req.user._id;
  const paidAt = new Date();
  try {
    const order = await createNewOrderRepo({
      shippingInfo,
      orderedItems,
      user,
      paymentInfo,
      paidAt,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    res.status(201).json({ msg: "Order palced successfully", order: order });
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

export const getSingleOrder = async (req, res, next) => {
  const orderId = req.params.id;
  try {
    const order = await getOrder(orderId);
    if (!order) {
      res.status(400).json({ success: false, msg: "Order not found" });
    }
    res.status(200).json({ success: true, response: order });
  } catch (err) {
    return next(new ErrorHandler(500, err));
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await myOrders(req.user._id);
    if (orders.length > 0) {
      return res.status(200).json({ msg: "Your orders", response: orders });
    }
    res.status(200).json({ msg: "No orders found" });
  } catch (err) {
    return next(new ErrorHandler(500, err));
  }
};

export const getAllPlacedOrders = async (req, res, next) => {
  try {
    const allOrders = await allPlacedOrders();
    if (allOrders.length > 0) {
      return res.status(200).json({ msg: "Your orders", response: allOrders });
    }
    res.status(200).json({ msg: "No orders found" });
  } catch (err) {
    return next(new ErrorHandler(500, err));
  }
};

export const getUpdateOrderDetails = async (req, res, next) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;
  try {
    const updatedOrder = await updateOrderDetails(orderId, orderStatus);
    if (!updatedOrder) {
      return res.status(400).json({ msg: "Order not found" });
    }
    res
      .status(200)
      .json({ msg: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    return next(new ErrorHandler(500, err));
  }
};
