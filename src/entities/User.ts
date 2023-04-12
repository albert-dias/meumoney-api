import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  document: string;

  @Column()
  avatar_url: string;

  @Column()
  is_active: number;

  @Column()
  is_premium: number;

  @Column()
  is_admin: number;

  @Column()
  expires_premium: Date;

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