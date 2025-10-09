import express from 'express';
import { Request,Response } from 'express';

const app = express();
const UsuarioRoutes = express.Router();

// Handler de exemplo
const criarUsuario = (req: Request, res: Response) => {
  res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
};

UsuarioRoutes.post('/usuarios', criarUsuario);

app.use('/', UsuarioRoutes);

export { UsuarioRoutes };