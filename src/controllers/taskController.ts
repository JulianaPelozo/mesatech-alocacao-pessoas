import { Request, Response } from "express";
import Task from "../models/taskModel";
import Funcionario from "../models/funcionarioModel";

export const getFilteredTasks = async (req: Request, res: Response) => {
  try {
    const { empresaId, funcionarioId, categoria, startDate, endDate } = req.query;

    const filter: any = {};

    if (empresaId) {
      const funcionarios = await Funcionario.find({ empresa: empresaId }).select("_id");
      filter.employee = { $in: funcionarios };
    }


    if (funcionarioId) {
      filter.employee = funcionarioId;
    }

    if (categoria) {
      filter.category = categoria;
    }

    // 🔹 Filtro por período
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate as string) };
      filter.endDate = { $lte: new Date(endDate as string) };
    }

    const tasks = await Task.find(filter)
      .populate({
        path: "employee",
        populate: { path: "empresa", model: "Empresa" }
      });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao filtrar tarefas", error });
  }
};
export const criarTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  }
  catch (error) {
    res.status(500).json({ message: "Erro ao criar tarefa", error });
  }

};

export const listarTasks = async (_: Request, res: Response) => {
  try {
    const tasks = await Task.find().populate("employee");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas", error });
  }
};

export const atualizarTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error });
  }
};

export const excluirTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir tarefa", error });
  }
};
