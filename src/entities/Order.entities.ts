import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entities";
import { OrderItem } from "./OrderItem.entities";
import { Address } from "./Address.entities";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true, default: "Processando" })
  status: string /*"Processando" | "Enviando" | "Finalizado"*/;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;
}
