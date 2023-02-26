import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
}

export class TransactionListService {
  private transactionsRepository: Repository<Transaction>

  constructor() {
    this.transactionsRepository = dataSource.getRepository(Transaction);
  }

  public async execute({ user_id }: IRequest): Promise<Transaction[]> {

    const transaction = await this.transactionsRepository.find({
      where: {
        user_id
      },
      relations: ["category"]
    })

    return transaction;

  }
}