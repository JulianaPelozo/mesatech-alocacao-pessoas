import { Router } from 'express';
import {
    registerLogin,
    login
} from '../controllers/loginController';
import { 
    cadastrarFuncionario 
} from '../controllers/funcionarioController';

const router = Router();

router.post('/register', registerLogin);
router.post('/login', login);
router.post('/cadastrar-funcionario', cadastrarFuncionario);

export default router;
