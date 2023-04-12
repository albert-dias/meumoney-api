import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import auth from "../config/auth";
import { dataSource } from "../database";
import { User } from "../entities/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
export class AuthenticatedUserService {
  private usersRepository: Repository<User>;
  constructor() {
    this.usersRepository = dataSource.getRepository(User);
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || !password) {
      throw new Error("Dados incompletos, verifique a requisição!");
    }

    const emailTrat = email.toLowerCase().trim();

    const user = await this.usersRepository.findOne({
      where: { email: emailTrat },
    });
    // const user = await this.usersRepository.findOne({ where: { email: document }, relations: ['role_id', 'client_id'] });

    if (!user) throw new Error("Usuário não existe");

    if (user.is_active == 0) throw new Error("Usuário não liberado!");

    const { secret, expiresIn } = auth.jwt;

    const token = sign(
      { name: user.name, premium: user.is_premium, expires_premium: user.expires_premium, is_admin: user.is_admin },
      secret,
      {
        subject: `${user.id}`,
        expiresIn,
      }
    );

    return { user, token };
  }
}
