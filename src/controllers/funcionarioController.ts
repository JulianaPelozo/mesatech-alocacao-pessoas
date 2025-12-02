import { Request, Response } from "express";
import Funcionario from "../models/funcionarioModel";

export const cadastrarFuncionario = async (req: Request, res: Response) => {
  try {
    const { nome, cargo, telefone, empresa } = req.body;

    // Verifica campos obrigatórios
    if (!nome || !cargo || !empresa) {
      return res.status(400).json({ message: "Os campos 'nome', 'cargo' e 'empresa' são obrigatórios." });
    }

    const funcionario = new Funcionario({
      nome,
      cargo,
      telefone,
      empresa
    });

    const salvo = await funcionario.save();

    res.status(201).json({
      message: "Funcionário cadastrado com sucesso!",
      funcionario: salvo,
    });

  } catch (error: any) {
    console.error("Erro ao cadastrar funcionário:", error);
    res.status(500).json({ message: "Erro no servidor.", error: error.message });
  }
};

export const listarFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await Funcionario.find().populate("empresa");
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar funcionários." });
  }
};

export const buscarFuncionarioPorId = async (req: Request, res: Response) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id).populate("empresa");

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar funcionário." });
  }
};

export const atualizarFuncionario = async (req: Request, res: Response) => {
  try {
    const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!funcionarioAtualizado) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.json({
      message: "Funcionário atualizado com sucesso!",
      funcionario: funcionarioAtualizado
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar funcionário." });
  }
};

export const deletarFuncionario = async (req: Request, res: Response) => {
  try {
    const deletado = await Funcionario.findByIdAndDelete(req.params.id);

    if (!deletado) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.json({ message: "Funcionário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar funcionário." });
  }
};
