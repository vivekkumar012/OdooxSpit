import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: String,
    code: { type: String, unique: true },
    description: String
}, { timestamps: true });

const warehouseModel = mongoose.model("Warehouse", warehouseSchema);
export default warehouseModel;
