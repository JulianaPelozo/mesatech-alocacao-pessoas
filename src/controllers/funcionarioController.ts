import { Request, Response } from "express";
import Funcionario from "../models/funcionarioModel";

/* ============================
   CRIAR FUNCIONÁRIO
============================ */
export const cadastrarFuncionario = async (req: Request, res: Response) => {
  try {
    const {
      name,
      departamento,
      funcao,
      telefone,
      email,
      disponivel,
      empresa,
      tags,
      gerente
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O campo 'name' é obrigatório." });
    }

    const funcionario = new Funcionario({
      name,
      departamento,
      funcao,
      telefone,
      email,
      disponivel,
      empresa,
      tags,
      gerente
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

/* ============================
   LISTAR TODOS
============================ */
export const listarFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await Funcionario.find();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar funcionários." });
  }
};

/* ============================
   BUSCAR POR ID
============================ */
export const buscarFuncionarioPorId = async (req: Request, res: Response) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar funcionário." });
  }
};

/* ============================
   ATUALIZAR
============================ */
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

/* ============================
   DELETAR
============================ */
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
