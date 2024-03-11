import { Favorite, Product, User } from "../entities";
import { favoriteRepository } from "../repositories";
import { favoriteReadSchema, favoriteReturnSchema } from "../schemas";

const create = async (
  foundUser: User,
  foundProduct: Product
): Promise<Object> => {
  const favorite: Favorite = favoriteRepository.create({
    user: foundUser,
    product: foundProduct,
  });
  await favoriteRepository.save(favorite);
  return favoriteReturnSchema.parse(favorite);
};

const read = async (foundUser: User): Promise<Object[]> => {
  const favorites: Favorite[] = await favoriteRepository.find({
    where: { user: foundUser },
    relations: ["product"],
  });
  console.log(favorites);
  return favoriteReadSchema.parse(favorites);
};

const destroy = async (favorite: Favorite): Promise<void> => {
  await favoriteRepository.delete(favorite);
};

export default { create, read, destroy };
