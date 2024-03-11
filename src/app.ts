import "reflect-metadata";
import "express-async-errors";
import express from "express";
import {
  sessionRouter,
  userRouter,
  addressRouter,
  productRouter,
  cartRouter,
  favoriteRouter,
  orderRouter,
} from "./routers";
import middlewares from "./middlewares";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/addresses", addressRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/favorites", favoriteRouter);
app.use("/orders", orderRouter);

app.use(middlewares.handleErrors);

export default app;
