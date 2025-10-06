import { Request, Response } from "express";
import Usuario from "../Model/Usuario";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      res.status(400).json({ msg: "Por favor, preencha todos os campos" });
      return;
    }

    const user = new Usuario({ name, email, mobile, password });
    await user.save();

    res.status(201).json({ msg: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};