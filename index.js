const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

dotenv.config();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));

app.use("/api/products", productRouter);
app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
