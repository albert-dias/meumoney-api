import { Repository } from "typeorm";
import { dataSource } from "../database";
import { Category } from "../entities/Category";
import { Financing } from "../entities/Financing";
import { PortionPayment } from "../entities/PortionPayment";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
  id: string;
  value: number;
}

export class FinancingPortionPaymentService {
  private financingRepository: Repository<Financing>;
  private categoriesRepository: Repository<Category>;
  private portionPaymentRepository: Repository<PortionPayment>;
  private transactionsRepository: Repository<Transaction>;

  constructor() {
    this.financingRepository = dataSource.getRepository(Financing);
    this.categoriesRepository = dataSource.getRepository(Category);
    this.portionPaymentRepository = dataSource.getRepository(PortionPayment);
    this.transactionsRepository = dataSource.getRepository(Transaction);
  }

  public async execute({ id, user_id, value }: IRequest): Promise<Financing> {
    if (!id || !user_id || !value) {
      throw new Error("Dados incompletos, verifique o formulário");
    }

    const category = await this.categoriesRepository.findOne({
      where: {
        name: "FINANCIAMENTOS",
      },
    });

    if (!category) {
      throw new Error("A categoria financiamento não existe");
    }

    const financing = await this.financingRepository.findOne({
      where: {
        id,
        user_id,
      },
    });

    console.log("4", financing);
    if (!financing) {
      throw new Error("O financiamento não existe");
    }

    const portion = this.portionPaymentRepository.create({
      financing_id: financing.id,
      portion_number: financing.total_portions_payments + 1,
      value,
      user_id,
    });

    console.log("6", portion);

    financing.total_portions_payments = financing.total_portions_payments + 1;

    console.log("7");
    await this.portionPaymentRepository.save(portion);
    console.log("8");
    await this.financingRepository.save(financing);
    console.log("9");
    const transaction = this.transactionsRepository.create({
      user_id,
      value,
      type: "debit",
      description: `Parcela ${financing.total_portions_payments} do ${financing.description}`,
      category_id: category.id,
    });
    await this.transactionsRepository.save(transaction);

    return financing;
  }
}
