import { User } from "../entities";
import { UserRead, UserReturn, UserUpdate } from "../interfaces";
import { userRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas";

const create = async (payload: Object): Promise<UserReturn> => {
  const user = userRepository.create(payload);
  await userRepository.save(user);
  return userReturnSchema.parse(user);
};

const read = async (): Promise<UserRead> => {
  const users: UserRead = await userRepository.find();
  return userReadSchema.parse(users);
};

const retrieve = async (foundUser: User): Promise<UserReturn> => {
  return userReturnSchema.parse(foundUser);
};

const update = async (
  foundUser: User,
  payload: UserUpdate
): Promise<UserReturn> => {
  const user: User = await userRepository.save({ ...foundUser, ...payload });
  return userReturnSchema.parse(user);
};

const destroy = async (foundUser: User): Promise<void> => {
  await userRepository.softRemove(foundUser);
};

export default { create, read, retrieve, update, destroy };
