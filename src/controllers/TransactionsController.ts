import { Request, Response } from "express";
import { TransactionCreateService } from "../services/TransactionCreateService";
import { TransactionListService } from "../services/TransactionListService";

export class TransactionsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user
      const {
        description,
        category_id,
        type,
        value
      } = req.body;

      const transactionService = new TransactionCreateService();

      const transaction = await transactionService.execute({
        description,
        category_id,
        type,
        value,
        user_id: id
      });

      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user
      const transactionService = new TransactionListService();

      const transaction = await transactionService.execute({
        user_id: id
      });

      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}