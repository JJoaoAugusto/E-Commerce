import { NextFunction, Request, Response } from "express";
import { productRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyProductIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { productId } = req.params;
  const foundProduct = await productRepository.findOneBy({
    id: Number(productId),
  });
  if (!foundProduct) {
    throw new AppError("Product not found", 404);
  }
  res.locals = { ...res.locals, foundProduct };
  return next();
};
