import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import exemploRoutes from './routes/exemploRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
galera as rotas vocês criam um arquivo de rota na pasta 
importam eles aqui e colocam nessa parte de rotas

Exemplo: 
    import userRoutes from './routes/userRoutes'
    app.use('/api', userRoutes)
*/

//rotas

app.use('/api', exemploRoutes)

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI não esta no .env');
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar com MongoDB:', error);
  });
  


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});