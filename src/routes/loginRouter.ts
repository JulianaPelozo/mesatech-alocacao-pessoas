import { Router } from 'express';
import {
    registerLogin,
    login
} from '../controllers/loginController';

const router = Router();

router.post('/register', registerLogin);
router.post('/login', login);

export default router;
