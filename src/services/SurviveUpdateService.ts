import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Category } from "../entities/Category";
import { Survive } from "../entities/Survive";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
  description: string;
  category_id: string;
  type: "credit" | "debit";
  value: number;
  id: string;
}

export class TransactionUpdateService {
  private surviviesRepository: Repository<Survive>
  private transactionsRepository: Repository<Transaction>
  private categoriesRepository: Repository<Category>

  constructor() {
    this.surviviesRepository = dataSource.getRepository(Survive);
    this.transactionsRepository = dataSource.getRepository(Transaction);
    this.categoriesRepository = dataSource.getRepository(Category);
  }

  public async execute({
    user_id,
    category_id,
    description,
    type,
    value,
    id
  }: IRequest): Promise<Transaction> {

    if (!category_id || !description || !type || !value) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const category = await this.categoriesRepository.findOne({
      where: {
        id: category_id,
      }
    })

    if (category.name === "GASTOS RECORRENTES") {
      const surviveExist = await this.surviviesRepository.find({
        where: {
          description
        }
      })

      if (surviveExist.length > 0) {
        throw new Error("Esta conta recorrente já existe para este usuário");
      }

      const survive = this.surviviesRepository.create({
        description,
        type,
        user_id
      })

      await this.surviviesRepository.save(survive);
    }

    const transaction = await this.transactionsRepository.findOne({
      where: {
        user_id,
        id
      }
    });

    transaction.category_id = category_id;
    transaction.description = description;
    transaction.type = type;
    transaction.value = value;

    await this.transactionsRepository.save(transaction);

    return transaction
  }
}