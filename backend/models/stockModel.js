import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true, index: true },
    quantity: { type: Number, default: 0 },
}, { timestamps: true });

stockSchema.index({ product: 1, warehouse: 1 }, { unique: true });

const stockModel = mongoose.model("Stock", stockSchema);
export default stockModel;
