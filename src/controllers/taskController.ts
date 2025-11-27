import { Request, Response } from "express";
import Task from "../models/taskModel";


export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter tarefas." });
  }
};


export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar tarefa." });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar tarefa." });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    res.json({ message: "Tarefa deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar tarefa." });
  }
};
