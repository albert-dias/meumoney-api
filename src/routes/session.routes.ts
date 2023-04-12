import { Router } from "express";

import { AuthenticatedUserService } from "../services/AuthenticatedUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const authenticateUser = new AuthenticatedUserService();

    const { user, token } = await authenticateUser.execute({
      email,
    });

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;