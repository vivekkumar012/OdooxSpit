import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://vivekofficial8434:Vivek%4012345@cluster0.jhmtwk9.mongodb.net/StockMaster");
        console.log("DataBase is connected");
    } catch (error) {
        console.log("DataBase error", error.message);
    }
}

export default connectDB;