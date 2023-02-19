import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  email: string;
  is_admin: number;
  is_premium: number;
  expires_premium: Date;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, name, email, is_admin, is_premium, expires_premium } = decoded as ITokenPayload;

    req.user = {
      id: sub,
      name,
      email,
      is_admin,
      is_premium,
      expires_premium,
    };

    return next();
  } catch (err) {
    throw new Error("Invalid JWT token");
  }
}