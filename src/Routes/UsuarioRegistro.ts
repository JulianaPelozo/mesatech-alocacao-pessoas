import express  from "express";
import { register } from "../controller/UsuarioController."
const userRegister = express.Router();

userRegister.post('/register', register)

export  { userRegister }