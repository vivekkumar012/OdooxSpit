import express from "express";


const app = express();

app.use("/", (req, res) => {
    res.send("Hello vivek from backend");
})


const port = 3001

app.listen(port, () => {
    console.log(`App is listening on port${port}`);
})