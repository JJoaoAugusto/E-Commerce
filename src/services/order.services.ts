import { Address, Cart, Order, OrderItem, Product, User } from "../entities";
import { AppError } from "../errors";
import { OrderReturn, OrderUpdate } from "../interfaces";
import {
  cartRepository,
  orderItemRepository,
  orderRepository,
  productRepository,
} from "../repositories";
import { orderReturnSchema } from "../schemas";

const create = async (
  foundUser: User,
  foundAddress: Address
): Promise<OrderReturn> => {
  const carts: Cart[] = await cartRepository.find({
    where: { user: foundUser },
    relations: ["product"],
  });

  if (carts.length <= 0) throw new AppError("Carts not found", 404);

  const order: Order = orderRepository.create({
    user: foundUser,
    address: foundAddress,
  });
  await orderRepository.save(order);

  carts.forEach(async (cart) => {
    if (cart.quantity > cart.product.quantity || cart.product.quantity <= 0)
      throw new AppError(
        `The product ${cart.product.name} dont have this quantity in stock`,
        403
      );

    const data = {
      quantity: cart.quantity,
      price: cart.product.price * cart.quantity,
    };

    const orderItem: OrderItem = orderItemRepository.create({
      ...data,
      order: order,
      product: cart.product,
    });
    await orderItemRepository.save(orderItem);

    await productRepository.save({
      ...cart.product,
      quantity: cart.product.quantity - data.quantity,
    });

    await cartRepository.delete(cart);
  });

  return orderReturnSchema.parse(order);
};

const read = async (foundUser: User): Promise<Order[]> => {
  const orders: Order[] = await orderRepository.find({
    where: { user: foundUser },
    relations: { orderItems: { product: true }, address: true },
    withDeleted: true,
  });

  return orders;
};

const retrieve = async (foundOrder: Order): Promise<Order> => {
  return foundOrder;
};

const update = async (
  foundOrder: Order,
  payload: OrderUpdate
): Promise<OrderReturn> => {
  const order: Order = await orderRepository.save({
    ...foundOrder,
    ...payload,
  });
  return orderReturnSchema.parse(order);
};

export default { create, read, retrieve, update };
