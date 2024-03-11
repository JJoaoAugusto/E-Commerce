import { Request, Response } from "express";
import { addressServices } from "../services";
import { Address } from "../entities";
import { AddressReturn } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundUser } = res.locals;
  const address: AddressReturn = await addressServices.create(body, foundUser);
  return res.status(201).json(address);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { foundUser } = res.locals;
  const addresses: Address[] = await addressServices.read(foundUser);
  return res.status(200).json(addresses);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { foundAddress } = res.locals;
  const address: AddressReturn = await addressServices.retrieve(foundAddress);
  return res.status(200).json(address);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { foundAddress } = res.locals;
  const address: AddressReturn = await addressServices.update(
    foundAddress,
    body
  );
  return res.status(200).json(address);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { foundAddress } = res.locals;
  await addressServices.destroy(foundAddress);
  return res.status(204).json();
};

export default { create, read, retrieve, update, destroy };
