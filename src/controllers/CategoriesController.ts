import { Request, Response } from "express";
import { CategoryCreateService } from "../services/CategoryCreateService";
import { CategoryListService } from "../services/CategoryListService";

export class CategoriesController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        color,
        name,
      } = req.body;

      const categoryService = new CategoryCreateService();

      const category = await categoryService.execute({
        color,
        name,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService = new CategoryListService();

      const category = await categoryService.execute();

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}