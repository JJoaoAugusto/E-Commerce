import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entities";
import { Product } from "./Products.entities";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 8, scale: 2, default: 0 })
  price: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;
}
