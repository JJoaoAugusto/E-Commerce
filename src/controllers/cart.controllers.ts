import { Request, Response } from "express";
import { cartServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundUser, foundProduct } = res.locals;
  const cart = await cartServices.create(
    body.quantity,
    foundUser,
    foundProduct
  );
  return res.status(201).json(cart);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  const carts: Object[] = await cartServices.read(foundUser);
  return res.status(200).json(carts);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundCart } = res.locals;
  const cart: Object = await cartServices.update(foundCart, body.quantity);
  return res.status(200).json(cart);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { foundCart } = res.locals;
  await cartServices.destroy(foundCart);
  return res.status(204).json();
};

export default { create, read, update, destroy };
