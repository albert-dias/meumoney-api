import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { dataSource } from "../database";
import { User } from "../entities/User";

interface IRequest {
  user_id: string;
}

export class UserDeleteAccountService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute({ user_id }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new Error("Usuario não existe!");
    }

    userExists.name = "unknown user";
    userExists.email = "unknown user";
    userExists.avatar_url;
    userExists.fullname = "unknown user";
    userExists.is_admin = 0;
    userExists.is_premium = 0;
    userExists.is_active = 0;

    await this.usersRepository.save(userExists);

    return userExists;
  }
}
