import { Repository } from "typeorm";
import { dataSource } from "../database";
import { User } from "../entities/User";

interface IResquest {
  user_id: string;
}

export class AdmShowUserService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute({ user_id }: IResquest): Promise<User[]> {

    const user = await this.usersRepository.findBy({
      id: user_id
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    return user;

  }
}