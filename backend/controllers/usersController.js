const User = require("../models/User");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //kolla ifall användarnamn eller lösenord är tomt.
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //kolla om användarnamn redan är satt
  const dupe = await User.findOne({ username }).lean().exec();

  if (dupe) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //Hash lösenordet innan det sparas
  const hashedPassword = await bcrypt.hash(password, 10); //10 salt rundor.
  const userObject = { username, password: hashedPassword };

  //skapa och lagra en ny användare
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created.` });
  } else {
    res.status(400).json({ message: "Invalid user data recieved." });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, orders, password } = req.body;

  if (!id || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const dupe = await User.findOne({ username }).lean().exec();
  //tillåt uppdateringar till originala användaren.
  if (dupe && dupe?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.orders = orders;

  if (password) {
    //Hash lösenord
    user.password = await bcrypt.hash(password, 10); //10 salt rundor
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User id required" });
  }

  const orders = await Order.findOne({ user: id }).lean().exec();
  if (orders?.length) {
    return res.status(400).json({ message: "User has active orders" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
