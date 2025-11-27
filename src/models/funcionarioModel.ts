import mongoose, { Document, Schema } from "mongoose";

export enum Disponibilidade {
    DISPONIVEL = "Disponível",
    INDISPONIVEL = "Indisponível"
}

export interface IFuncionario extends Document {
    name: string;
    departamento: string;
    projeto: string;
    disponibilidade: Disponibilidade;
    company: string;
    funcao: string;
    tags: string[];
    telefone: string;
    gerente: string;
}

class FuncionarioClass {
    name!: string;
    departamento!: string;
    projeto!: string;
    disponibilidade!: Disponibilidade;
    company!: string;
    funcao!: string;
    tags!: string[];
    telefone!: string;
    gerente!: string;

    constructor(
        name?: string,
        departamento?: string,
        projeto?: string,
        disponibilidade?: Disponibilidade,
        company?: string,
        funcao?: string,
        tags?: string[],
        telefone?: string,
        gerente?: string
    ) {
        if (name) this.name = name;
        if (departamento) this.departamento = departamento;
        if (projeto) this.projeto = projeto;
        if (disponibilidade) this.disponibilidade = disponibilidade;
        if (company) this.company = company;
        if (funcao) this.funcao = funcao;
        if (tags) this.tags = tags;
        if (telefone) this.telefone = telefone;
        if (gerente) this.gerente = gerente;
    }
}

const funcionarioSchema = new Schema<IFuncionario>(
    {
        name: { type: String, required: true },

        departamento: { type: String, required: true },
        projeto: { type: String, required: true },

        disponibilidade: {
            type: String,
            enum: Object.values(Disponibilidade),
            required: true
        },

        company: { type: String, required: true },
        funcao: { type: String, required: true },

        tags: {
            type: [String],
            default: []
        },

        telefone: { type: String, required: true },

        gerente: { type: String, required: true }
    },
    {
        timestamps: true,
        collection: "funcionarios"
    }
);

funcionarioSchema.loadClass(FuncionarioClass);

const Funcionario = mongoose.model<IFuncionario>(
    "Funcionario",
    funcionarioSchema
);

export default Funcionario;
