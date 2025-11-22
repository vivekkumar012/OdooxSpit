import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
    type: { type: String, enum: ["receipt", "delivery", "transfer", "adjustment"], required: true },
    status: { type: String, enum: ["draft", "waiting", "ready", "done", "canceled"], default: "draft" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    fromWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" }, 
    toWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },   
    reference: String, 
    notes: String,
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    performedAt: Date
}, { timestamps: true });

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
