import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Financing } from "../entities/Financing";

interface IRequest {
  id: string;
  user_id: string;
}

export class FinancingShowService {
  private financingRepository: Repository<Financing>

  constructor() {
    this.financingRepository = dataSource.getRepository(Financing);
  }

  public async execute({
    id,
    user_id,
  }: IRequest): Promise<Financing> {

    if (!user_id || !id) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const financing = this.financingRepository.findOne({
      where: {
        id,
        user_id
      }
    })

    if (!financing) {
      throw new Error("Financiamento não encontrado");
    }

    return financing
  }
}