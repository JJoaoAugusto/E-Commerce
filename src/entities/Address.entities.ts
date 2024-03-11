import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entities";
import { Order } from "./Order.entities";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 3 })
  state: string;

  @Column({ length: 60 })
  city: string;

  @Column({ length: 60 })
  block: string;

  @Column({ length: 60 })
  street: string;

  @Column({ type: "integer" })
  number: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @OneToMany(() => Order, (order) => order.address)
  order: Order;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string | null;
}
