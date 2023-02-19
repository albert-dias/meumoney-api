import { Router } from "express";
import sessionRoutes from "./session.routes";

const routes = Router();

routes.get("/", (req, res) => res.json({ result: "bem-vindo ao hiclub" }));

routes.use("/session", sessionRoutes);


export default routes;
