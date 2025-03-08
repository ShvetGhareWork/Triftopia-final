import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  payment_method: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true }, // Corrected the typo
});

const orderModel =
  mongoose.models.order || mongoose.model("order", OrderSchema);

export default orderModel;
