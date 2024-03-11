import { AppDataSource } from "../data-source";
import { Product } from "../entities";

export default AppDataSource.getRepository(Product);
