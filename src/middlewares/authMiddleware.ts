/*import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};*/
