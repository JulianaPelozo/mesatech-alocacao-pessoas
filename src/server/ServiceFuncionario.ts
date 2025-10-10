import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface InterFuncionario {
    nomeFunc: string;
    telefoneFunc: string;
    emailFunc: string;
    disponivel?: boolean;
}

class ServiceFuncionario {
    async execute({nomeFunc, telefoneFunc,emailFunc,disponivel}: InterFuncionario){


        if(!nomeFunc || !emailFunc || !telefoneFunc){
            throw new Error("Nome,email e telefone são obrigatórios");
        }

        const funcionario = await prisma.funcionario.create({
            data: {
                nomeFunc, 
                telefoneFunc,
                emailFunc,
                disponivel : true
    }
        });
        return funcionario;
    }
}
export {ServiceFuncionario}
