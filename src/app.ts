import { login } from './controllers/loginController';
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import exemploRoutes from './routes/exemploRoutes'
import loginRoutes from './routes/Router'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', exemploRoutes)
app.use('/api', loginRoutes) 


if (!MONGODB_URI) {
  throw new Error('MONGODB_URI não está no arquivo .env');
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB')
  })
  .catch((error) => {
    console.error(' Erro ao conectar com MongoDB:', error)
  })


app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`)
})
