import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nomeCompleto: { 
    type: String,
    required: true },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  senha: { 
    type: String, 
    required: true
  }

});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
