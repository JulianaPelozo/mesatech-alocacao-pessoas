import { FastifyRequest, FastifyReply } from "fastify"; 
import { ServiceFuncionario } from "../server/ServiceFuncionario";

class FuncionarioController {
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {nome,email } = request.body as {nome: string, email: string};
        
        const serviceFuncionario = new ServiceFuncionario();
        const funcionario = await serviceFuncionario.execute({nome,email});

        reply.send(funcionario);

    }
}
export { FuncionarioController };
