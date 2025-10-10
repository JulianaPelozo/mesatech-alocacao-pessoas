import fastify, {FastifyInstance,FastifyPluginOptions,FastifyRequest,FastifyReply} from 'fastify';
import { FuncionarioController } from './controller/funcionarioController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/funcionarios", async (request: FastifyRequest, reply: FastifyReply) => {
        return { message: "OK" }
    })

    fastify.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
        return new FuncionarioController().handle(request, reply);

})
}