import { Router } from "express";
import categoriesRouter from "./category.routes";
import sessionRoutes from "./session.routes";
import surviviesRouter from "./survive.routes";
import transactionsRouter from "./transaction.routes";
import usersRouter from "./user.routes";

const routes = Router();

routes.get("/", (req, res) => res.json({ result: "bem-vindo ao hiclub" }));

routes.use("/session", sessionRoutes);
routes.use("/users", usersRouter);
routes.use("/categories", categoriesRouter);
routes.use("/transactions", transactionsRouter);
routes.use("/survivies", surviviesRouter);


export default routes;
