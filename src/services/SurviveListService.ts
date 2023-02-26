import { MoreThanOrEqual, Repository } from "typeorm";
import { dataSource } from "../database";
import { Survive } from "../entities/Survive";
import { Transaction } from "../entities/Transaction";

interface IRequest {
  user_id: string;
  month: number;
  year: number;
}

interface IResponse {
  value: number;
  description: string;
  created_at?: Date;

}

export class SurviveListService {
  private surviviesRepository: Repository<Survive>
  private transactionsRepository: Repository<Transaction>

  constructor() {
    this.surviviesRepository = dataSource.getRepository(Survive);
    this.transactionsRepository = dataSource.getRepository(Transaction);
  }

  public async execute({ user_id, month, year }: IRequest): Promise<IResponse[]> {

    const survive = await this.surviviesRepository.find({
      where: {
        user_id
      },
    })

    const transactions = await this.transactionsRepository.find({
      where: {
        created_at: MoreThanOrEqual(new Date(`${year}-${month}-1 00:00:00`)),
        category: {
          name: "GASTOS RECORRENTES"
        }
      }
    });

    const result = survive.map(sur => {
      const trans = transactions.filter(transac => transac.description === sur.description);

      if (trans.length > 0) {
        return {
          value: trans[0].value,
          description: trans[0].description,
          created_at: trans[0].created_at,
        }
      } else {
        return {
          value: 0,
          description: sur.description,

        }
      }
    });

    return result;
    ;

  }
}