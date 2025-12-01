import mongoose, { Document, Schema } from "mongoose";

export interface IFuncionario extends Document {
  nome: string;
  cargo: string;
  telefone: string;
  empresa: mongoose.Types.ObjectId;
}

const FuncionarioSchema = new Schema<IFuncionario>({
  nome: { type: String, required: true },
  cargo: { type: String, required: true },
  telefone: { type: String },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa", required: true }
}, { timestamps: true });

const Funcionario = mongoose.model<IFuncionario>("Funcionario", FuncionarioSchema);
export default Funcionario;
