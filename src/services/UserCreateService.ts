import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { dataSource } from "../database";
import { User } from "../entities/User";

interface IRequest {
  email: string;
  name: string;
  lastname: string;
  avatar_url: string;
}

export class UserCreateService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute({
    email,
    name,
    lastname,
    avatar_url
  }: IRequest): Promise<User> {


    if (!email || !name || !lastname) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const emailTrat = email.toLowerCase().trim();

    const userExists = await this.usersRepository.findOne({
      where: {
        email: emailTrat,
      }
    })

    if (userExists) {
      throw new Error('E-mail ja cadastrado na nossa base de dados!')
    }

    const user = this.usersRepository.create({
      email,
      name,
      avatar_url,
      fullname: `${name} ${lastname}`,
      is_admin: 0,
      is_premium: 0,
      is_active: 1,
    })

    await this.usersRepository.save(user);

    return user
  }
}