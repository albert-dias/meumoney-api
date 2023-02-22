import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Financing } from "../entities/Financing";

interface IRequest {
  description: string;
  user_id: string;
  maturity_day: number;
  total_portions: number;
  total_portions_payments: number;
  value_portion: number;
  type: "credit" | "debit";
}

export class CreateService {
  private financingRepository: Repository<Financing>

  constructor() {
    this.financingRepository = dataSource.getRepository(Financing);
  }

  public async execute({
    description,
    maturity_day,
    total_portions,
    total_portions_payments,
    type,
    user_id,
    value_portion,
  }: IRequest): Promise<Financing> {

    if (!description ||
      !maturity_day ||
      !total_portions ||
      !total_portions_payments ||
      !type ||
      !user_id ||
      !value_portion) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const financing = this.financingRepository.create({
      description,
      maturity_day,
      total_portions,
      total_portions_payments,
      type,
      value_portion,
      user_id,
    })

    await this.financingRepository.save(financing)

    return financing
  }
}