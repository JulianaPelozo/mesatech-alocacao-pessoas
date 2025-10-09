import Usuario from '../Model/Usuario';
import { Request,Response } from 'express';

export const register = async(req: Request, res: Response) => {

  try {
    const {fullName, email, senha} = req.body;

    let existirUsuario = await Usuario.findOne({ email });
    if (existirUsuario) {
      return res.status(500).json({ message: 'Usuário já existe' });
    }

    const novoUsuario = new Usuario({ fullName, email, senha });
    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });  
  }
}