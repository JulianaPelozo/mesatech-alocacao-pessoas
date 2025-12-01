import mongoose, { Document, Schema } from "mongoose";

export interface IEmpresa extends Document {
  nome: string;
  cnpj: string;
  endereco?: string;
}

const EmpresaSchema = new Schema<IEmpresa>({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  endereco: { type: String }
}, { timestamps: true });

const Empresa = mongoose.model<IEmpresa>("Empresa", EmpresaSchema);
export default Empresa;
