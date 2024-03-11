import { Router } from "express";
import cartControllers from "../controllers/cart.controllers";
import middlewares from "../middlewares";
import { cartCreateSchema } from "../schemas";

export const cartRouter: Router = Router();

cartRouter.post(
  "/create/products/:productId",
  middlewares.verifyToken,
  middlewares.verifyProductIdExists,
  middlewares.validateBody(cartCreateSchema),
  cartControllers.create
);

cartRouter.get("/read", middlewares.verifyToken, cartControllers.read);

cartRouter.patch(
  "/update/:cartId",
  middlewares.verifyToken,
  middlewares.verifyCartIdExists,
  middlewares.verifyCartPermission,
  cartControllers.update
);

cartRouter.delete(
  "/delete/:cartId",
  middlewares.verifyToken,
  middlewares.verifyCartIdExists,
  middlewares.verifyCartPermission,
  cartControllers.destroy
);
