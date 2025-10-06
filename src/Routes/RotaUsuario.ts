import { Router } from "express";
import { register as registerUser } from "../controller/UsuarioController.";

const router: Router = Router();

router.post("/registro", registerUser);

export default router;