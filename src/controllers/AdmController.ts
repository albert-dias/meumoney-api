import { Request, Response } from "express";
import { AdmListUsersService } from "../services/AdmListUsersService";
import { AdmShowUserService } from "../services/AdmShowUserService";

export class AdmController {
  async listusers(req: Request, res: Response): Promise<Response> {
    try {
      const admService = new AdmListUsersService();

      const users = await admService.execute();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showuser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.params

      const admService = new AdmShowUserService();

      const user = await admService.execute({
        user_id
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}