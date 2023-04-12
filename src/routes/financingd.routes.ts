import { Router } from "express";
import { FinancingsController } from "../controllers/FinancingsController";

const financingController = new FinancingsController()
const financingRouter = Router();

financingRouter.post("/", financingController.create);
financingRouter.post("/portion", financingController.payment_portion);
financingRouter.get("/:finan_id", financingController.show);
financingRouter.get("/", financingController.list);

export default financingRouter;