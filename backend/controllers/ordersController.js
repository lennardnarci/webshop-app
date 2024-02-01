const User = require("../models/User");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("products").lean();
  if (!orders.length) {
    return res.status(400).json({ message: "No orders found" });
  }

  const ordersWithUser = await Promise.all(
    orders.map(async (order) => {
      const user = await User.findById(order.user).lean().exec();
      return { ...order, username: user.username };
    })
  );

  res.json(ordersWithUser);
});

const createOrder = asyncHandler(async (req, res) => {
  const { user, products, orderSum } = req.body;
  if (
    !user ||
    !products ||
    !orderSum ||
    !Array.isArray(products) ||
    products.length === 0
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const order = await Order.create({ user, products, orderSum });

  if (order) {
    return res
      .status(201)
      .json({ message: `New order created: ${order.orderID}` });
  } else {
    return res.status(400).json({ message: "Invalid order data received" });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id, user, products, orderSum } = req.body;

  if (!id || !user || !products.length || !orderSum) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  order.user = user;
  order.products = products;
  order.orderSum = orderSum;

  const updatedOrder = await order.save();

  res.json({ message: `Order: ${updatedOrder.orderID} updated` });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Order ID required" });
  }

  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  const result = await order.deleteOne();

  const reply = `Order: ${result._id} deleted`;

  res.json({ message: reply });
});

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
