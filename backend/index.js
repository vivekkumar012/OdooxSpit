import express from "express";
import userRouter from "./routes/userRouter.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/", (req, res) => {
    res.send("Hello vivek from backend");
})
app.use("/api/v1/user", userRouter);


const port = 3001

app.listen(port, () => {

    console.log(`App is listening on port${port}`);
    connectDB();
})