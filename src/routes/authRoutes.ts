import { Router } from 'express';

import { authController } from '../controllers/authController';
import { cadastrarFuncionario } from '../controllers/funcionarioController';

import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, authController.getProfile);
router.get('/verify', authenticateToken, authController.verifyToken);
router.post('/funcionarios', authenticateToken, cadastrarFuncionario);


export default router;
