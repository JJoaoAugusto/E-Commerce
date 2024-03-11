import { Router } from "express";
import { productControllers } from "../controllers";
import middlewares from "../middlewares";
import { productCreateSchema, productUpdateSchema } from "../schemas";

export const productRouter: Router = Router();

productRouter.post(
  "/create",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.validateBody(productCreateSchema),
  productControllers.create
);

productRouter.get("/read", productControllers.read);

productRouter.get(
  "/retrieve/:productId",
  middlewares.verifyProductIdExists,
  productControllers.retrieve
);

productRouter.patch(
  "/update/:productId",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.verifyProductIdExists,
  middlewares.validateBody(productUpdateSchema),
  productControllers.update
);

productRouter.delete(
  "/delete/:productId",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.verifyProductIdExists,
  productControllers.destroy
);
