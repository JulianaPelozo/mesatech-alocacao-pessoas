import express from 'express'
import cors from 'cors' 

const app = express()

import { UsuarioRoutes } from './Routes/UsuarioRoutes'
import {userRegister} from './Routes/UsuarioRegistro'
app.use(express.json())


app.use('/registro', userRegister)
app.use(UsuarioRoutes)
app.use(cors())

app.listen(3000)
















