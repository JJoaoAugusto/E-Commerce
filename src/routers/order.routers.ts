import { Router } from "express";
import { orderControllers } from "../controllers";
import middlewares from "../middlewares";
import { orderCreateSchema, orderUpdateSchema } from "../schemas";

export const orderRouter: Router = Router();

orderRouter.post(
  "/create/address/:addressId",
  middlewares.verifyToken,
  middlewares.validateBody(orderCreateSchema),
  middlewares.verifyAddressIdExists,
  orderControllers.create
);

orderRouter.get("/read", middlewares.verifyToken, orderControllers.read);

orderRouter.get(
  "/retrieve/:orderId",
  middlewares.verifyToken,
  middlewares.verifyOrderIdExists,
  middlewares.verifyOrderPermission,
  orderControllers.retrieve
);

orderRouter.patch(
  "/update/:orderId",
  middlewares.verifyToken,
  middlewares.verifyOrderIdExists,
  middlewares.verifyAdmin,
  middlewares.validateBody(orderUpdateSchema),
  orderControllers.update
);
