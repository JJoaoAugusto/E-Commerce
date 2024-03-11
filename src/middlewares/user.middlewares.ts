import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories";
import { AppError } from "../errors";
import { User } from "../entities";

export const verifyUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = res.locals.decoded.sub;
  const user = await userRepository.findOneBy({ id: Number(userId) });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  res.locals = { ...res.locals, user };
  return next();
};

export const verifyEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const { foundUser } = res.locals;
  const user: User | null = await userRepository.findOne({
    where: { email },
    relations: ["carts"],
  });
  if (user && foundUser && user.id !== foundUser.id) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};

export const verifyUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId } = req.params;
  const { sub, admin } = res.locals.decoded;
  if (admin) return next();
  if (userId !== sub) throw new AppError("Insufficient permission", 403);
  return next();
};
