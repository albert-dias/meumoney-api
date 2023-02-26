import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("survives")
export class Survive {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @JoinColumn()
  user: User;

  @Column()
  type: "credit" | "debit";

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