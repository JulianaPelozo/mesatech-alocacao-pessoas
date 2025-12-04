import mongoose, { Document, Schema } from 'mongoose';

export interface IAllocation extends Document {
  employeeName: string;
  company: string;
  title?: string;
  startDate: string;
  endDate: string;
  color: string;
  cargaHorariaSemanal?: number;
  createdAt: Date;
  updatedAt: Date;
}

const allocationSchema = new Schema<IAllocation>({
  employeeName: {
    type: String,
    required: [true, 'Nome do funcionário é obrigatório'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Empresa é obrigatória'],
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  startDate: {
    type: String,
    required: [true, 'Data de início é obrigatória'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD']
  },
  endDate: {
    type: String,
    required: [true, 'Data de término é obrigatória'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD']
  },
  color: {
    type: String,
    required: [true, 'Cor é obrigatória'],
    trim: true,
    default: '#4F46E5'
  },
  cargaHorariaSemanal: {
    type: Number,
    min: 0,
    max: 40,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
allocationSchema.index({ employeeName: 1 });
allocationSchema.index({ company: 1 });
allocationSchema.index({ startDate: 1, endDate: 1 });

const Allocation = mongoose.model<IAllocation>('Allocation', allocationSchema);

export default Allocation;
