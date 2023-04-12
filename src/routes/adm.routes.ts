import { Router } from "express";
import { AdmController } from "../controllers/AdmController";

const admController = new AdmController()
const admRouter = Router();

admRouter.get("/:user_id", admController.showuser);
admRouter.get("/", admController.listusers);

export default admRouter;