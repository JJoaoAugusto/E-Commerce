import { NextFunction, Request, Response } from "express";
import { orderItemRepository, orderRepository } from "../repositories";
import { AppError } from "../errors";
import { Order } from "../entities";

export const verifyOrderIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { orderId } = req.params;
  const foundOrder: Order | null = await orderRepository.findOne({
    where: { id: Number(orderId) },
    relations: { orderItems: { product: true }, address: true },
    withDeleted: true,
  });
  if (!foundOrder) throw new AppError("Order not found", 404);
  res.locals = { ...res.locals, foundOrder };
  return next();
};

export const verifyOrderPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { foundUser, foundOrder } = res.locals;
  const owner = await orderRepository.findOneBy({
    id: foundOrder.id,
    user: foundUser,
  });
  if (!owner) throw new AppError("Insufficient permission", 403);
  return next();
};

export const verifyOrderItemIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { orderItemId } = req.params;
  const orderItem = await orderItemRepository.findOneBy({
    id: Number(orderItemId),
  });

  if (!orderItem) {
    throw new AppError("OrderItem not found", 404);
  }

  res.locals = { ...res.locals, orderItem };
  return next();
};

export const verifyOrderItemPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { foundOrder, foundOrderItem } = res.locals;
  if (foundOrder.id !== foundOrderItem.order.id)
    throw new AppError("Insufficient permission", 403);
  return next();
};
