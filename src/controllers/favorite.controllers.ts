import { Request, Response } from "express";
import { favoriteServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser, foundProduct } = res.locals;
  const favorite = await favoriteServices.create(foundUser, foundProduct);
  return res.status(201).json(favorite);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  const favorites: Object[] = await favoriteServices.read(foundUser);
  return res.status(200).json(favorites);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { foundFavorite } = res.locals;
  await favoriteServices.destroy(foundFavorite);
  return res.status(204).json();
};

export default { create, read, destroy };
