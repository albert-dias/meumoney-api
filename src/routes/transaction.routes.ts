import { Router } from "express";
import { TransactionsController } from "../controllers/TransactionsController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const transactionsController = new TransactionsController()
const transactionsRouter = Router();

transactionsRouter.post("/", ensureAuthenticated, transactionsController.create);
transactionsRouter.get("/", ensureAuthenticated, transactionsController.list);

export default transactionsRouter;