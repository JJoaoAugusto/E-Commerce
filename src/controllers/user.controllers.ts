import { Request, Response } from "express";
import { userServices } from "../services";
import { UserRead, UserReturn } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const user: UserReturn = await userServices.create(body);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  const user: UserReturn = await userServices.retrieve(foundUser);
  return res.status(200).json(user);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundUser } = res.locals;
  const user: UserReturn = await userServices.update(foundUser, body);
  return res.status(200).json(user);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  await userServices.destroy(foundUser);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };
