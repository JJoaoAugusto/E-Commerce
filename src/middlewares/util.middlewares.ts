import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import { userRepository } from "../repositories";
import { User } from "../entities";

export const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    return next();
  };

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const admin: boolean = res.locals.decoded.admin;
  if (!admin) throw new AppError("Insufficient permission", 403);
  return next();
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);
  const [_bearer, token]: Array<string> = authorization.split(" ");
  const decoded = verify(token, process.env.SECRET_KEY!);
  const foundUser: User | null = await userRepository.findOneBy({
    id: Number(decoded.sub),
  });
  if (!foundUser) throw new AppError("User not found", 404);
  res.locals = {
    ...res.locals,
    decoded: decoded,
    foundUser,
  };
  return next();
};
