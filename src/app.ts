import Fastfy from 'fastify';
import cors from '@fastify/cors';
import { register } from './controller/UsuarioController.';
import { routes } from './routes';

const app = Fastfy({ logger: true });


const start = async () => {
    await app.register(cors)
    await app.register(routes)
   

    try {
        await app.listen({ port: 3000 });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}


start();























