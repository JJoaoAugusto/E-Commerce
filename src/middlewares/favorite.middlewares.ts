import { NextFunction, Request, Response } from "express";
import { favoriteRepository } from "../repositories";
import { AppError } from "../errors";

export const verifyFavoriteIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { favoriteId } = req.params;
  const foundFavorite = await favoriteRepository.findOne({
    where: { id: Number(favoriteId) },
    relations: ["user"],
  });
  if (!foundFavorite) throw new AppError("Favorite not found", 404);
  res.locals = { ...res.locals, foundFavorite };
  return next();
};

export const verifyFavoritePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { foundUser, foundFavorite } = res.locals;
  if (foundFavorite.user.id !== foundUser.id)
    throw new AppError("Insufficient permission", 403);
  return next();
};
