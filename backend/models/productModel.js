import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  sku: { type: String, required: true, unique: true, index: true },
  category: { type: String, default: "General" },
  uom: { type: String, default: "pcs" }, // unit of measure
  description: String,
  reorderLevel: { type: Number, default: 0 }, // low stock threshold
  createdAt: { type: Date, default: Date.now }
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
