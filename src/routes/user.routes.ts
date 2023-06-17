import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post("/", usersController.create);
usersRouter.delete("/", ensureAuthenticated, usersController.delete);

export default usersRouter;
