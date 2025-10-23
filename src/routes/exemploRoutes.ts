import { Router } from "express";
import {
getUsers,
createUsers
} from "../controllers/ExemploController";


const router = Router()

router.get('/', getUsers)
router.post('/', createUsers)


export default router


