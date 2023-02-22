import { Column, CreateDateColumn, JoinColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

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