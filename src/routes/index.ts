import { Router } from "express";
import adminAuthenticate from "../middlewares/adminAuthenticated";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import admRouter from "./adm.routes";
import categoriesRouter from "./category.routes";
import financingRouter from "./financingd.routes";
import sessionRoutes from "./session.routes";
import surviviesRouter from "./survive.routes";
import transactionsRouter from "./transaction.routes";
import usersRouter from "./user.routes";

const routes = Router();

routes.get("/", (req, res) => res.json({ result: "bem-vindo ao meumoney" }));

routes.use("/session", sessionRoutes);
routes.use("/adm", ensureAuthenticated, adminAuthenticate, admRouter);
routes.use("/users", usersRouter);
routes.use("/categories", categoriesRouter);
routes.use("/transactions", transactionsRouter);
routes.use("/survivies", surviviesRouter);
routes.use("/financing", ensureAuthenticated, financingRouter);


export default routes;
