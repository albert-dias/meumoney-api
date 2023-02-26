import { Request, Response } from "express";
import { SurviveListService } from "../services/SurviveListService";

export class SurviviesController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { month, year } = req.params

      const userService = new SurviveListService();

      const user = await userService.execute({
        user_id: id,
        month: Number(month),
        year: Number(year),
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}