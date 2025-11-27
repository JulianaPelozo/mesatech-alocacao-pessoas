import mongoose, { Schema, Document } from "mongoose";

export enum Funcao {
  DESENVOLVEDOR = "desenvolvedor",
  DESIGNER = "designer",
  GERENTE = "gerente",
  ANALISTA = "analista",
  OUTRO = "outro",
}

export interface IFuncionario extends Document {
  name: string;             // Usado na agenda
  departamento?: string;
  funcao?: Funcao;
  telefone?: string;
  email?: string;
  disponivel?: boolean;
  empresa?: string;
  tags?: string[];
  gerente?: string;
}

const funcionarioSchema = new Schema<IFuncionario>(
  {
    name: { type: String, required: true }, // <- ESSENCIAL PARA A AGENDA

    departamento: { type: String },
    funcao: { type: String, enum: Object.values(Funcao), default: Funcao.OUTRO },
    telefone: { type: String },
    email: { type: String },
    disponivel: { type: Boolean, default: true },
    empresa: { type: String },

    tags: [{ type: String }],

    // Pode ser o nome do gerente ou vínculo com outro funcionário
    gerente: { type: String }
  },
  { timestamps: true, collection: "funcionarios" }
);

export default mongoose.model<IFuncionario>(
  "Funcionario",
  funcionarioSchema
);
