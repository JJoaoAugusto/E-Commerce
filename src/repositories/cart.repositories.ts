import { AppDataSource } from "../data-source";
import { Cart } from "../entities";

export default AppDataSource.getRepository(Cart);
