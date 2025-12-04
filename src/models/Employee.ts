import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  role: string;
  company: string;
  companyColor: string;
  departamento?: string;
  projeto?: string;
  disponibilidade?: string;
  funcao?: string;
  telefone?: string;
  gerente?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Cargo é obrigatório'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Empresa é obrigatória'],
    trim: true
  },
  companyColor: {
    type: String,
    required: [true, 'Cor da empresa é obrigatória'],
    trim: true,
    default: '#4F46E5'
  },
  departamento: {
    type: String,
    trim: true
  },
  projeto: {
    type: String,
    trim: true
  },
  disponibilidade: {
    type: String,
    enum: ['Disponível', 'Indisponível', 'Parcialmente disponível'],
    default: 'Disponível'
  },
  funcao: {
    type: String,
    trim: true
  },
  telefone: {
    type: String,
    trim: true
  },
  gerente: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for faster searches
employeeSchema.index({ name: 1 });
employeeSchema.index({ company: 1 });
employeeSchema.index({ disponibilidade: 1 });

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
