import { Router } from "express";
import { favoriteControllers } from "../controllers";
import middlewares from "../middlewares";
import { favoriteCreateSchema } from "../schemas";

export const favoriteRouter: Router = Router();

favoriteRouter.post(
  "/create/products/:productId",
  middlewares.verifyToken,
  middlewares.verifyProductIdExists,
  middlewares.validateBody(favoriteCreateSchema),
  favoriteControllers.create
);

favoriteRouter.get("/read", middlewares.verifyToken, favoriteControllers.read);

favoriteRouter.delete(
  "/delete/:favoriteId",
  middlewares.verifyToken,
  middlewares.verifyFavoriteIdExists,
  middlewares.verifyFavoritePermission,
  favoriteControllers.destroy
);
