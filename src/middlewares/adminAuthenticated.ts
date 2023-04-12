import { Request, Response, NextFunction } from "express";
import { dataSource } from "../database";

import { User } from "../entities/User";

export default async function adminAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  if (!id) {
    throw new Error("User is missing");
  }

  try {

    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
        is_admin: 1,
      }
    })

    if (!user) {
      throw new Error("User is not Admin");
    }

    return next();
  } catch (err) {
    throw new Error("User is not Admin");
  }
}
