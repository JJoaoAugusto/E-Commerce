import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entities";
import { Product } from "./Products.entities";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Product, (product) => product.favorites)
  product: Product;
}
