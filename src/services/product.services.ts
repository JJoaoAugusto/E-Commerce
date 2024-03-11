import { Product } from "../entities";
import { ProductUpdate } from "../interfaces";
import { productRepository } from "../repositories";

const create = async (payload: Object): Promise<Product> => {
  const product: Product = productRepository.create(payload);
  await productRepository.save(product);
  return product;
};

const read = async (): Promise<Product[]> => {
  const products: Product[] = await productRepository.find();
  return products;
};

const retrieve = async (foundProduct: Product): Promise<Product> => {
  return foundProduct;
};

const update = async (
  foundProduct: Product,
  payload: ProductUpdate
): Promise<Product> => {
  const product: Product = await productRepository.save({
    ...foundProduct,
    ...payload,
  });
  return product;
};

const destroy = async (foundProduct: Product): Promise<void> => {
  productRepository.softRemove(foundProduct);
};

export default { create, read, retrieve, update, destroy };
