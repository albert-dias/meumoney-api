import { Request, Response } from "express";
import { FinancingCreateService } from "../services/FinancingCreateService";
import { FinancingListService } from "../services/FinancingListService";
import { FinancingPortionPaymentService } from "../services/FinancingPortionPaymentService";
import { FinancingShowService } from "../services/FinancingShowService";

export class FinancingsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const {
        description,
        maturity_day,
        total_portions,
        total_portions_payments,
        value_portion,
        type,
      } = req.body;

      const financingService = new FinancingCreateService();

      const financing = await financingService.execute({
        description,
        user_id: id,
        maturity_day,
        total_portions,
        total_portions_payments,
        value_portion,
        type,
      });

      return res.status(201).json(financing);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {

      const { id } = req.user;

      const financingService = new FinancingListService();

      const financing = await financingService.execute({
        user_id: id,
      });

      return res.status(201).json(financing);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { finan_id } = req.params;

      const financingService = new FinancingShowService();

      const financing = await financingService.execute({
        user_id: id,
        id: finan_id,
      });

      return res.status(201).json(financing);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async payment_portion(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const {
        finan_id,
        value
      } = req.body;

      const financingService = new FinancingPortionPaymentService();

      const financing = await financingService.execute({
        user_id: id,
        id: finan_id,
        value
      });

      return res.status(201).json(financing);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}