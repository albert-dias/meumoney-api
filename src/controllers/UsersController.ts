import { Request, Response } from "express";
import { UserCreateService } from "../services/UserCreateService";
import { UserDeleteAccountService } from "../services/UserDeleteAccountService";

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, lastname, avatar_url } = req.body;

      const userService = new UserCreateService();

      const user = await userService.execute({
        email,
        name,
        lastname,
        avatar_url,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const userService = new UserDeleteAccountService();

      await userService.execute({
        user_id: id,
      });

      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
