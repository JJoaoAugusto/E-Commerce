import { AppDataSource } from "../data-source";
import { Favorite } from "../entities";

export default AppDataSource.getRepository(Favorite);
