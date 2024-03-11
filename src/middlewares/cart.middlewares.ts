import { NextFunction, Request, Response } from "express";
import { cartRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyCartIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { cartId } = req.params;
  const foundCart = await cartRepository.findOne({
    where: { id: Number(cartId) },
    relations: ["user", "product"],
  });
  if (!foundCart) {
    throw new AppError("Cart not found", 404);
  }
  res.locals = { ...res.locals, foundCart };
  return next();
};

export const verifyCartPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { foundUser, foundCart } = res.locals;
  if (foundCart.user.id !== foundUser.id)
    throw new AppError("Insufficient permission", 403);
  return next();
};
