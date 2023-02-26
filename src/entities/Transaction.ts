import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  category_id: string;

  @JoinColumn({ name: "category_id" })
  @OneToOne(() => Category, cat => cat.id)
  category: Category;

  @Column()
  user_id: string;

  @JoinColumn()
  user: User;

  @Column()
  type: "credit" | "debit";

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}