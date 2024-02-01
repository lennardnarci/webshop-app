require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static("public"));

app.use("/", require("./routes/root"));

app.use("/users", require("./routes/userRoutes"));

app.use("/orders", require("./routes/orderRoutes"));

app.use("/products", require("./routes/productRoutes"));

app.use("/login", require("./routes/loginRoutes"));

app.use("/search", require("./routes/searchRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
