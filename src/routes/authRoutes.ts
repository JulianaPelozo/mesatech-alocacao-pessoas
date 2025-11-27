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
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController";


import { authenticateToken } from "../middleware/auth";

const router = Router();


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticateToken, authController.getProfile);
router.get("/verify", authenticateToken, authController.verifyToken);



router.post("/funcionarios", authenticateToken, cadastrarFuncionario);
router.get("/funcionarios", authenticateToken, listarFuncionarios);
router.get("/funcionarios/:id", authenticateToken, buscarFuncionarioPorId);
router.put("/funcionarios/:id", authenticateToken, atualizarFuncionario);
router.delete("/funcionarios/:id", authenticateToken, deletarFuncionario);


router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTask);
router.delete("/tasks/:id", authenticateToken, deleteTask);


export default router;
