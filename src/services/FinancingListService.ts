import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Financing } from "../entities/Financing";

interface IRequest {
  user_id: string;
}

export class FinancingListService {
  private financingRepository: Repository<Financing>

  constructor() {
    this.financingRepository = dataSource.getRepository(Financing);
  }

  public async execute({
    user_id,
  }: IRequest): Promise<Financing[]> {

    if (!user_id) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const financings = this.financingRepository.find({
      where: { user_id }
    })

    return financings
  }
}