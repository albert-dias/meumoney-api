import { Request, Response } from "express";
import { CreateService } from "../services/User/CreateService";

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        email,
        name,
        lastname,
        password
      } = req.body;

      const userService = new CreateService();

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