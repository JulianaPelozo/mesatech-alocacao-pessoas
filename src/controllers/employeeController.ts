import { Response } from 'express';
import Employee from '../models/Employee';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
export const getEmployees = async (req: AuthRequest, res: Response) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao buscar funcionários' });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
export const getEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao buscar funcionário' });
  }
};

// @desc    Create employee
// @route   POST /api/employees
// @access  Private
export const createEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const { name, role, company, companyColor, departamento, projeto, disponibilidade, funcao, telefone, gerente, tags } = req.body;

    // Validate required fields
    if (!name || !role || !company) {
      return res.status(400).json({ error: 'Nome, cargo e empresa são obrigatórios' });
    }

    const employee = await Employee.create({
      name,
      role,
      company,
      companyColor: companyColor || '#4F46E5',
      departamento,
      projeto,
      disponibilidade: disponibilidade || 'Disponível',
      funcao,
      telefone,
      gerente,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao criar funcionário' });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
export const updateEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao atualizar funcionário' });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
export const deleteEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.json({
      success: true,
      message: 'Funcionário deletado com sucesso'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao deletar funcionário' });
  }
};
