import { AppDataSource } from "../data-source";
import { OrderItem } from "../entities";

export default AppDataSource.getRepository(OrderItem);
