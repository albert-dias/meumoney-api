import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

const categoriesController = new CategoriesController()
const categoriesRouter = Router();

categoriesRouter.post("/", categoriesController.create);
categoriesRouter.get("/", categoriesController.list);

export default categoriesRouter;