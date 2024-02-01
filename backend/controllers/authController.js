const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // kolla om lösen och användarnamn skickades med
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // hitta användaren
  const user = await User.findOne({ username }).lean().exec();

  // kolla om användaren existerar
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // kolla om lösenorden matchar
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // löserord matchar
    res.status(200).json({ message: "Login successful", userID: user._id });
  } else {
    // lösenord matchar inte
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = { loginUser };
