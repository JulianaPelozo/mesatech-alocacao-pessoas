import express from 'express'
import cors from 'cors'

const app = express()


app.get('/', (req, res) => {
    res.json({message: 'Servidor rodando na porta 3000'})
})

app.listen(3000)
















