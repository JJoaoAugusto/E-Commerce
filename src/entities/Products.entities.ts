import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Favorite } from "./Favorite.entities";
import { Cart } from "./Cart.entities";
import { OrderItem } from "./OrderItem.entities";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 8, scale: 2, default: 0 })
  price: number;

  @Column()
  sale: number;

  @Column()
  image: string;

  @Column({ default: "Quadros" })
  category: string /*"Quadros" | "Prints" | "Desenhos"*/;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string | null;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
