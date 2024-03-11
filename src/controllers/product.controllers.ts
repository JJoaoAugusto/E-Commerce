import { Request, Response } from "express";
import { productServices } from "../services";
import { Product } from "../entities";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const product: Product = await productServices.create(body);
  return res.status(201).json(product);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const products: Product[] = await productServices.read();
  return res.status(200).json(products);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { foundProduct } = res.locals;
  const product = await productServices.retrieve(foundProduct);
  return res.status(200).json(product);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundProduct } = res.locals;
  const product: Product = await productServices.update(foundProduct, body);
  return res.status(200).json(product);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { foundProduct } = res.locals;
  await productServices.destroy(foundProduct);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };
