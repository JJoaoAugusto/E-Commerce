import { NextFunction, Request, Response } from "express";
import { addressRepository } from "../repositories";
import { AppError } from "../errors";
import { Address } from "../entities";

export const verifyAddressIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { addressId } = req.params;
  const foundAddress: Address | null = await addressRepository.findOne({
    where: { id: Number(addressId) },
    relations: ["user"],
  });
  if (!foundAddress) throw new AppError("Address not found", 404);
  res.locals = { ...res.locals, foundAddress };
  return next();
};

export const verifyAddressPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { foundUser, foundAddress } = res.locals;
  if (foundAddress.user.id !== foundUser.id)
    throw new AppError("Insufficient permission", 403);
  return next();
};
