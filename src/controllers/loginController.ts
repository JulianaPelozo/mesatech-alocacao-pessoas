import {Request, Response} from "express";
import Login, {Role} from "../models/loginModel";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const registerLogin = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password, phone, CPF, role} = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !CPF || !role) {
        return res.status(400).json({message: "Todos os campos são obrigatórios."});
    }
    try {
        const existingUser = await Login.findOne({$or: [{email}, {CPF}]});
        if (existingUser) {
            return res.status(400).json({message: "Usuário já existe."});
    }

    const cript = await bcrypt.genSalt(10);
    const login = new Login({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, cript),
        phone,
        CPF,
        role
    });
    await login.save();

    res.status(201).json({message: "Usuário criado com sucesso."});
    } catch (error) {
        res.status(500).json({message: "Erro no servidor."});
    }
};

export const login = async (req: Request, res: Response) => {
    const {identifier, password} = req.body;

    if (!identifier || !password) {
        return res.status(400).json({message: "Email e senha são obrigatórios."});
    }

    try {
        const user = await Login.findOne({$or: [{email: identifier}]});
        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Senha incorreta."});
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            CPF: user.CPF,
            role: user.role
            
            }, process.env.JWT_SECRET || "secret", {expiresIn: "1h"});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Erro no servidor."});
    }
};

