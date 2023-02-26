import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
  id: string;
}

export class TransactionDeleteService {
  private transactionsRepository: Repository<Transaction>

  constructor() {
    this.transactionsRepository = dataSource.getRepository(Transaction);
  }

  public async execute({ user_id, id }: IRequest): Promise<void> {

    const transaction = await this.transactionsRepository.findOne({
      where: {
        user_id,
        id
      },
    })

    if (!transaction) {
      throw new Error("Transação inexistente!")
    }

    await this.transactionsRepository.delete(transaction)

    return;

  }
}