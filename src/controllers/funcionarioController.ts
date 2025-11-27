import { Request, Response } from "express";
import Funcionario, { IFuncionario, Disponibilidade } from "../models/funcionarioModel";

/**
 * @route 
 * @desc 
 * @access 
 */
export const cadastrarFuncionario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            name,
            departamento,
            projeto,
            disponibilidade,
            company,
            funcao,
            tags,
            telefone,
            gerente
        } = req.body;

        // 1. Validações obrigatórias
        if (
            !name ||
            !departamento ||
            !projeto ||
            !disponibilidade ||
            !company ||
            !funcao ||
            !telefone ||
            !gerente
        ) {
            return res.status(400).json({
                message: "Todos os campos obrigatórios devem ser preenchidos."
            });
        }

        if (!Object.values(Disponibilidade).includes(disponibilidade)) {
            return res.status(400).json({
                message: "Valor de disponibilidade inválido. Use: 'Disponível' ou 'Indisponível'."
            });
        }

       
        const tagsArray =
            typeof tags === "string"
                ? tags.split(",").map((t: string) => t.trim())
                : Array.isArray(tags)
                ? tags
                : [];

        const novoFuncionario: Partial<IFuncionario> = {
            name,
            departamento,
            projeto,
            disponibilidade,
            company,
            funcao,
            tags: tagsArray,
            telefone,
            gerente
        };

        const funcionarioCriado = await Funcionario.create(novoFuncionario);

        return res.status(201).json({
            message: `Funcionário ${name} cadastrado com sucesso!`,
            funcionario: funcionarioCriado
        });

    } catch (error) {
        console.error("Erro ao cadastrar funcionário:", error);
        return res.status(500).json({
            message: "Erro interno do servidor ao tentar cadastrar o funcionário."
        });
    }
};
