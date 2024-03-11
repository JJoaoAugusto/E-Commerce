import { AppDataSource } from "../data-source";
import { Order } from "../entities";

export default AppDataSource.getRepository(Order);
