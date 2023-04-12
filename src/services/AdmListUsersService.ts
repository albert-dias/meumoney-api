import { Repository } from "typeorm";
import { dataSource } from "../database";
import { User } from "../entities/User";

export class AdmListUsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute(): Promise<User[]> {

    const users = await this.usersRepository.find()

    return users;

  }
}