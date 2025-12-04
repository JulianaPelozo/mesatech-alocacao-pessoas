# ANU Backend - Sistema de Gestão de Tempo

Backend desenvolvido em TypeScript, Node.js, Express e MongoDB para o sistema ANU.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **Bcrypt** - Hash de senhas

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
# Especialmente MONGODB_URI e JWT_SECRET
```

## 🏃 Executar

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter usuário autenticado

### Funcionários
- `GET /api/employees` - Listar todos os funcionários
- `GET /api/employees/:id` - Obter funcionário por ID
- `POST /api/employees` - Criar novo funcionário
- `PUT /api/employees/:id` - Atualizar funcionário
- `DELETE /api/employees/:id` - Deletar funcionário

### Alocações
- `GET /api/allocations` - Listar todas as alocações
- `GET /api/allocations/employee/:employeeName` - Alocações por funcionário
- `POST /api/allocations` - Criar nova alocação
- `PUT /api/allocations/:id` - Atualizar alocação
- `DELETE /api/allocations/:id` - Deletar alocação
- `DELETE /api/allocations/employee/:employeeName` - Deletar todas as alocações de um funcionário

## 🔐 Autenticação

Todas as rotas (exceto login/register) requerem token JWT no header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

## 🗄️ Modelos de Dados

### User
```typescript
{
  name: string
  email: string
  password: string (hashed)
  createdAt: Date
}
```

### Employee
```typescript
{
  name: string
  role: string
  company: string
  companyColor: string
  departamento?: string
  projeto?: string
  disponibilidade?: string
  funcao?: string
  telefone?: string
  gerente?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Allocation
```typescript
{
  employeeName: string
  company: string
  title?: string
  startDate: string (YYYY-MM-DD)
  endDate: string (YYYY-MM-DD)
  color: string
  cargaHorariaSemanal?: number
  createdAt: Date
  updatedAt: Date
}
```

## 📝 Licença

ISC
