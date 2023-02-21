import { Column, CreateDateColumn, JoinColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

export class Financing {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  total_portions: string;

  @Column()
  total_portions_payments: string;

  @Column()
  value_portion: string;

  @Column()
  maturity_day: number;

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