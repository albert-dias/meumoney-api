import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { dataSource } from "../../database";
import { User } from "../../entities/User";

interface IRequest {
  email: string;
  name: string;
  lastname: string;
  password: string;
}

export class CreateService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute({
    email,
    name,
    lastname,
    password
  }: IRequest): Promise<User> {

    if (!email || !name || !lastname || !password) {
      throw new Error("Dados incompletos, verifique o formulário")
    }

    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      }
    })

    if (userExists) {
      throw new Error('E-mail ja cadastrado na nossa base de dados!')
    }

    const hashPass = await hash(password, 8);

    const user = this.usersRepository.create({
      email,
      name,
      fullname: `${name} ${lastname}`,
      is_admin: 0,
      is_premium: 0,
      password: hashPass,
    })

    await this.usersRepository.save(user);

    return user
  }
}