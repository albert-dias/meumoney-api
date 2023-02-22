import { Request, Response } from "express";
import { UserCreateService } from "../services/UserCreateService";

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        email,
        name,
        lastname,
        password
      } = req.body;

      const userService = new UserCreateService();

      const user = await userService.execute({
        email,
        name,
        lastname,
        password
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}