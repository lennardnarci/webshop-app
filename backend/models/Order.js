const mongoose = require("mongoose");
const IncrementID = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
    orderSum: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(IncrementID, {
  inc_field: "orderID",
  id: "orderNums",
  start_seq: 1000,
});

module.exports = mongoose.model("Order", orderSchema);
