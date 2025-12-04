import { Response } from 'express';
import Allocation from '../models/Allocation';
import { AuthRequest } from '../middleware/auth';

// @desc    Get all allocations
// @route   GET /api/allocations
// @access  Private
export const getAllocations = async (_req: AuthRequest, res: Response) => {
  try {
    const allocations = await Allocation.find().sort({ startDate: -1 });
    
    res.json({
      success: true,
      count: allocations.length,
      data: allocations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao buscar alocações' });
  }
};

// @desc    Get allocations by employee name
// @route   GET /api/allocations/employee/:employeeName
// @access  Private
export const getAllocationsByEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const allocations = await Allocation.find({ 
      employeeName: req.params.employeeName 
    }).sort({ startDate: -1 });
    
    res.json({
      success: true,
      count: allocations.length,
      data: allocations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao buscar alocações' });
  }
};

// @desc    Create allocation
// @route   POST /api/allocations
// @access  Private
export const createAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { employeeName, company, title, startDate, endDate, color, cargaHorariaSemanal } = req.body;

    // Validate required fields
    if (!employeeName || !company || !startDate || !endDate) {
      res.status(400).json({ 
        error: 'Nome do funcionário, empresa, data de início e data de término são obrigatórios' 
      });
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      res.status(400).json({ 
        error: 'Datas devem estar no formato YYYY-MM-DD' 
      });
      return;
    }

    const allocation = await Allocation.create({
      employeeName,
      company,
      title: title || `Alocado na ${company}`,
      startDate,
      endDate,
      color: color || '#4F46E5',
      cargaHorariaSemanal: cargaHorariaSemanal || 0
    });

    res.status(201).json({
      success: true,
      data: allocation
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao criar alocação' });
  }
};

// @desc    Update allocation
// @route   PUT /api/allocations/:id
// @access  Private
export const updateAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const allocation = await Allocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!allocation) {
      res.status(404).json({ error: 'Alocação não encontrada' });
      return;
    }

    res.json({
      success: true,
      data: allocation
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao atualizar alocação' });
  }
};

// @desc    Delete allocation
// @route   DELETE /api/allocations/:id
// @access  Private
export const deleteAllocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const allocation = await Allocation.findByIdAndDelete(req.params.id);

    if (!allocation) {
      res.status(404).json({ error: 'Alocação não encontrada' });
      return;
    }

    res.json({
      success: true,
      message: 'Alocação deletada com sucesso'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao deletar alocação' });
  }
};

// @desc    Delete all allocations for an employee
// @route   DELETE /api/allocations/employee/:employeeName
// @access  Private
export const deleteEmployeeAllocations = async (req: AuthRequest, res: Response) => {
  try {
    const result = await Allocation.deleteMany({ 
      employeeName: req.params.employeeName 
    });

    res.json({
      success: true,
      message: `${result.deletedCount} alocação(ões) deletada(s) com sucesso`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Erro ao deletar alocações' });
  }
};
