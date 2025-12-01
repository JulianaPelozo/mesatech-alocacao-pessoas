import { Request, Response } from "express";
import Empresa from "../models/empresaModel";

export const criarEmpresa = async (req: Request, res: Response) => {
  try {
    const empresa = new Empresa(req.body);
    await empresa.save();
    res.status(201).json(empresa);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar empresa", error });
  }
};

export const listarEmpresas = async (_: Request, res: Response) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar empresas", error });
  }
};

export const atualizarEmpresa = async (req: Request, res: Response) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empresa) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    res.json(empresa);
    } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar empresa", error });
  } 
};

export const excluirEmpresa = async (req: Request, res: Response) => {
    try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    res.json({ message: "Empresa excluída com sucesso" });
    } catch (error) {
    res.status(500).json({ message: "Erro ao excluir empresa", error });
    }
};

