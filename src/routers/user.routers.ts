import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post(
  "/create",
  middlewares.validateBody(userCreateSchema),
  middlewares.verifyEmailExists,
  userControllers.create
);

userRouter.get(
  "/read",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  userControllers.read
);

userRouter.get(
  "/retrieve/:userId",
  middlewares.verifyToken,
  middlewares.verifyUserPermission,
  middlewares.verifyUserIdExists,
  userControllers.retrieve
);

userRouter.patch(
  "/update/:userId",
  middlewares.verifyToken,
  middlewares.verifyUserPermission,
  middlewares.verifyUserIdExists,
  middlewares.validateBody(userUpdateSchema),
  middlewares.verifyEmailExists,
  userControllers.update
);

userRouter.delete(
  "/delete/:userId",
  middlewares.verifyToken,
  middlewares.verifyAdmin,
  middlewares.verifyUserIdExists,
  userControllers.destroy
);
