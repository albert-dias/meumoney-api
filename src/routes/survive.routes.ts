import { Router } from "express";
import { SurviviesController } from "../controllers/SurviviesController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const surviviesController = new SurviviesController()
const surviviesRouter = Router();

surviviesRouter.get("/:month/:year", ensureAuthenticated, surviviesController.list);

export default surviviesRouter;