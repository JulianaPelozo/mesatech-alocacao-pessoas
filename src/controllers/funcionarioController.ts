
import { Request, Response } from 'express';
import FuncionarioModel, { IFuncionario } from '../models/funcionarioModel'; 

/**
@route 
@desc 
@access 
 */
export const cadastrarFuncionario = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { firstName, lastName, email, password, phone, CPF, role } = req.body;

        if (!firstName || !lastName || !email || !password || !phone || !CPF || !role) {
            return res.status(400).json({ message: 'Todos os campos do funcionário (nome, sobrenome, email, senha, telefone, CPF e função) devem ser preenchidos.' });
        }

        const funcionarioExistentePorEmail = await FuncionarioModel.findOne({ email });
        if (funcionarioExistentePorEmail) {
            return res.status(409).json({ message: `O email ${email} já está em uso por outro funcionário.` });
        }

        const funcionarioExistentePorCPF = await FuncionarioModel.findOne({ CPF });
        if (funcionarioExistentePorCPF) {
            return res.status(409).json({ message: `O CPF ${CPF} já está em uso por outro funcionário.` });
        }
        
        const senhaHashed = password; 

        const novosDadosFuncionario: Partial<IFuncionario> = {
            firstName,
            lastName,
            email,
            password: senhaHashed,
            phone,
            CPF,
            role 
        };
        
        const novoFuncionario = new FuncionarioModel(novosDadosFuncionario);
        const funcionarioSalvo = await novoFuncionario.save();

        const respostaFuncionario = funcionarioSalvo.toObject();
        //delete respostaFuncionario.password;

        return res.status(201).json({ 
            message: `Funcionário ${firstName} ${lastName} cadastrado com sucesso!`, 
            funcionario: respostaFuncionario
        });

    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao tentar cadastrar o funcionário.' });
    }
};
