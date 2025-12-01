import { Router } from "express";
import { authController } from "../controllers/authController";
import {
  cadastrarFuncionario,
  listarFuncionarios,
  buscarFuncionarioPorId,
  atualizarFuncionario,
  deletarFuncionario
} from "../controllers/funcionarioController";
import {
  getFilteredTasks as getTasks,
  criarTask as createTask,
  atualizarTask as updateTask,
  excluirTask as deleteTask
} from "../controllers/taskController";
import {
  criarEmpresa,
  listarEmpresas,
  atualizarEmpresa,
  excluirEmpresa
} from "../controllers/empresaController";


import { authenticateToken } from "../middleware/auth";

const router = Router();

// Login e Registro
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticateToken, authController.getProfile);
router.get("/verify", authenticateToken, authController.verifyToken);

// Rotas de Funcionários
router.post("/funcionarios", authenticateToken, cadastrarFuncionario);
router.get("/funcionarios", authenticateToken, listarFuncionarios);
router.get("/funcionarios/:id", authenticateToken, buscarFuncionarioPorId);
router.put("/funcionarios/:id", authenticateToken, atualizarFuncionario);
router.delete("/funcionarios/:id", authenticateToken, deletarFuncionario);

// Rotas de Empresas
router.post('/empresas', criarEmpresa);
router.get('/empresas', listarEmpresas);
router.put('/empresas/:id', atualizarEmpresa);
router.delete('/empresas/:id', excluirEmpresa);

// Rotas de Tarefas
router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTask);
router.delete("/tasks/:id", authenticateToken, deleteTask);


export default router;
