import { Between, Repository } from "typeorm";
import { dataSource } from "../database";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
}

export class TransactionListMonthService {
  private transactionsRepository: Repository<Transaction>

  constructor() {
    this.transactionsRepository = dataSource.getRepository(Transaction);
  }

  public async execute({ user_id }: IRequest): Promise<Transaction[]> {

    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const transaction = await this.transactionsRepository.find({
      where: {
        user_id,
        created_at: Between(
          new Date(date.getFullYear(), date.getMonth(), 1), 
          new Date(date.getFullYear(), date.getMonth(), lastDay.getDate())
      ),
      },
      order:{ created_at: "DESC"},
      relations: ["category"]
    })

    return transaction;

  }
}