import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Financing } from "./Financing";
import { User } from "./User";

@Entity("portion_payments")
export class PortionPayment {
  @PrimaryColumn()
  id: string;

  @Column()
  portion_number: string;

  @Column()
  user_id: string;

  @JoinColumn()
  user: User;

  @Column()
  financing_id: string;

  @JoinColumn()
  financing: Financing;

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