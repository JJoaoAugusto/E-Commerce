import { Request, Response } from "express";
import { orderServices } from "../services";
import { Order } from "../entities";
import { OrderReturn } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser, foundAddress } = res.locals;
  const order: OrderReturn = await orderServices.create(
    foundUser,
    foundAddress
  );
  return res.status(201).json(order);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  const orders: Order[] = await orderServices.read(foundUser);
  return res.status(200).json(orders);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { foundOrder } = res.locals;
  const order: Order = await orderServices.retrieve(foundOrder);
  return res.status(200).json(order);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundOrder } = res.locals;
  const order = await orderServices.update(foundOrder, body);
  return res.status(200).json(order);
};

export default { create, read, retrieve, update };
