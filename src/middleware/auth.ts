import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Não autorizado - Token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        id: string;
        email: string;
      };

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Não autorizado - Token inválido' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};
