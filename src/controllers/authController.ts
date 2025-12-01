import { Request, Response } from 'express';
import Login from '../models/loginModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middleware/auth';

const authController = {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, phone, CPF, role } = req.body;

      console.log('Tentando registrar:', { email, CPF });

      if (!firstName || !lastName || !email || !password || !phone || !CPF || !role) {
        return res.status(400).json({ 
          message: 'Todos os campos são obrigatórios.' 
        });
      }

      const existingUser = await Login.findOne({ $or: [{ email }, { CPF }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      console.log('Senha hash criada');

      const login = new Login({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        CPF,
        role
      });
      
      await login.save();
      console.log('Usuário salvo no MongoDB');

      const token = jwt.sign(
        { 
          id: login._id,
          email: login.email,
          firstName: login.firstName,
          lastName: login.lastName,
          CPF: login.CPF,
          role: login.role
        }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '7d' }
      );

      console.log('Token JWT gerado');

      res.status(201).json({
        message: 'Usuário criado com sucesso.',
        token,
        user: {
          id: login._id,
          firstName: login.firstName,
          lastName: login.lastName,
          email: login.email,
          role: login.role
        }
      });

    } catch (error: any) { 
      console.error('ERRO NO REGISTER:', error);
      res.status(500).json({ 
        message: 'Erro no servidor.',
        error: error.message 
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }

      const user = await Login.findOne({ $or: [{ email: identifier }, { CPF: identifier }] });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { 
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          CPF: user.CPF,
          role: user.role
        }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '7d' }
      );

      res.status(200).json({
        message: 'Login realizado com sucesso!',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });

    } catch (error: any) { 
      console.error('ERRO NO LOGIN:', error);
      res.status(500).json({ 
        message: 'Erro no servidor.',
        error: error.message
      });
    }
  },

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await Login.findById(req.user.id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        CPF: user.CPF,
        role: user.role
      });
    } catch (error: any) { 
      console.error('ERRO NO GETPROFILE:', error);
      res.status(500).json({ 
        message: 'Erro no servidor.',
        error: error.message
      });
    }
  },

  async verifyToken(req: AuthRequest, res: Response) {
    res.json({ 
      valid: true, 
      user: req.user 
    });
  }
};

export { authController };