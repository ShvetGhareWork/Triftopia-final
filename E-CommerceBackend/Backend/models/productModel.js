import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  trusted: { type: Boolean, required: true },
  date: { type: Number, required: false },
  brand: { type: String, required: false },
  color: { type: String, required: false },
  material: { type: String, required: false },
  about: { type: String, required: false },
  rarityLevel: { type: String, required: true },
});
// if model is present the 1 is carried out and if not then a new model is created using the 2 here ((1 || 2))
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
