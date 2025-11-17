import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data) => {
  return await new OrderModel(data).save();
};

export const getOrder = async (_id) => {
  return await OrderModel.findById(_id);
};

export const myOrders = async (userId) => {
  return await OrderModel.find({ user: userId });
};

export const allPlacedOrders = async () => {
  return await OrderModel.find({});
};

export const updateOrderDetails = async (_id, orderStatus) => {
  return await OrderModel.findByIdAndUpdate(
    _id,
    { $set: { orderStatus } },
    {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    }
  );
};
