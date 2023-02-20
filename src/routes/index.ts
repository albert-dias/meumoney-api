import { Router } from "express";
import sessionRoutes from "./session.routes";
import usersRouter from "./user.routes";

const routes = Router();

routes.get("/", (req, res) => res.json({ result: "bem-vindo ao hiclub" }));

routes.use("/session", sessionRoutes);
routes.use("/users", usersRouter);


export default routes;
