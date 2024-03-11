import { Router } from "express";
import middlewares from "../middlewares";
import { addressCreateSchema, addressUpdateSchema } from "../schemas";
import { addressControllers } from "../controllers";

export const addressRouter: Router = Router();

addressRouter.post(
  "/create",
  middlewares.verifyToken,
  middlewares.validateBody(addressCreateSchema),
  addressControllers.create
);

addressRouter.get("/read", middlewares.verifyToken, addressControllers.read);

addressRouter.get(
  "/retrieve/:addressId",
  middlewares.verifyToken,
  middlewares.verifyAddressIdExists,
  middlewares.verifyAddressPermission,
  addressControllers.retrieve
);

addressRouter.patch(
  "/update/:addressId",
  middlewares.verifyToken,
  middlewares.verifyAddressIdExists,
  middlewares.verifyAddressPermission,
  middlewares.validateBody(addressUpdateSchema),
  addressControllers.update
);

addressRouter.delete(
  "/delete/:addressId",
  middlewares.verifyToken,
  middlewares.verifyAddressIdExists,
  middlewares.verifyAddressPermission,
  addressControllers.destroy
);
