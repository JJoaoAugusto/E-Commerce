import { Address, User } from "../entities";
import { AddressCreate, AddressUpdate } from "../interfaces";
import { AddressReturn } from "../interfaces/address.interfaces";
import { addressRepository } from "../repositories";
import { addressReturnSchema } from "../schemas";

const create = async (
  payload: AddressCreate,
  foundUser: User
): Promise<AddressReturn> => {
  const address: Address = addressRepository.create({
    ...payload,
    user: foundUser,
  });
  await addressRepository.save(address);
  return addressReturnSchema.parse(address);
};

const read = async (foundUser: User): Promise<Address[]> => {
  const addresses: Address[] = await addressRepository.findBy({
    user: foundUser,
  });
  return addresses;
};

const retrieve = async (foundAddress: Address): Promise<AddressReturn> => {
  return addressReturnSchema.parse(foundAddress);
};

const update = async (
  foundAddress: Address,
  payload: AddressUpdate
): Promise<AddressReturn> => {
  const address: Address = await addressRepository.save({
    ...foundAddress,
    ...payload,
  });
  return addressReturnSchema.parse(address);
};

const destroy = async (foundAddress: Address): Promise<void> => {
  await addressRepository.softRemove(foundAddress);
};

export default { create, read, retrieve, update, destroy };
