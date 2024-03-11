import { Cart, Product, User } from "../entities";
import { AppError } from "../errors";
import { cartRepository } from "../repositories";
import { cartReadSchema, cartReturnSchema } from "../schemas";

const create = async (
  quantity: number,
  foundUser: User,
  foundProduct: Product
): Promise<Object> => {
  if (quantity > foundProduct.quantity)
    throw new AppError("The product dont have this quantity in stock", 400);

  const payload = { quantity, price: quantity * foundProduct.price };

  const cart: Cart = cartRepository.create({
    ...payload,
    user: foundUser,
    product: foundProduct,
  });

  await cartRepository.save(cart);
  return cartReturnSchema.parse(cart);
};

const read = async (foundUser: User): Promise<Object[]> => {
  const carts: Cart[] = await cartRepository.find({
    where: { user: foundUser },
    relations: ["product"],
  });
  return cartReadSchema.parse(carts);
};

const update = async (foundCart: Cart, quantity: number): Promise<Object> => {
  const product: Product = foundCart.product;
  const payload = { quantity, price: quantity * product.price };

  if (quantity > product.quantity)
    throw new AppError("The product dont have this quantity in stock", 400);

  const cart: Cart = await cartRepository.save({ ...foundCart, ...payload });
  return cartReturnSchema.parse(cart);
};

const destroy = async (foundCart: Cart): Promise<void> => {
  await cartRepository.delete(foundCart);
};

export default { create, read, update, destroy };
