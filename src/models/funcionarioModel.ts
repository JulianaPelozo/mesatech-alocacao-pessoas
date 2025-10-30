import mongoose, 
{
    Document,
    Schema
} from "mongoose";


export enum Role {
    ADMINISTRADOR = 'administrador',
    USUARIO = 'usuario',
    CHEFE = 'chefe'
}


export interface IFuncionario extends Document {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    CPF: string
    role: Role

    getFirstName(): string
    setFirstName(firstName: string): void
    getLastName(): string
    setLastName(lastName: string): void
    getEmail(): string
    setEmail(email: string): void
    getPassword(): string
    setPassword(password: string): void
    getPhone(): string
    setPhone(phone: string): void
    getCPF(): string
    setCPF(CPF: string): void
    getRole(): Role
    setRole(role: Role): void
}


class FuncionarioClass {
    firstName!: string
    lastName!: string
    email!: string
    password!: string
    phone!: string
    CPF!: string
    role!: Role

    constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        phone?: string,
        CPF?: string,
        role?: Role
    ) {
        if (firstName) this.firstName = firstName
        if (lastName) this.lastName = lastName
        if (email) this.email = email
        if (password) this.password = password
        if (phone) this.phone = phone
        if (CPF) this.CPF = CPF
        if (role) this.role = role
    }

    getFirstName(): string { return this.firstName }
    setFirstName(firstName: string): void { this.firstName = firstName }
    getLastName(): string { return this.lastName }
    setLastName(lastName: string): void { this.lastName = lastName }
    getEmail(): string { return this.email }
    setEmail(email: string): void { this.email = email }
    getPassword(): string { return this.password }
    setPassword(password: string): void { this.password = password }
    getPhone(): string { return this.phone }
    setPhone(phone: string): void { this.phone = phone }
    getCPF(): string { return this.CPF }
    setCPF(CPF: string): void { this.CPF = CPF }
    getRole(): Role { return this.role }
    setRole(role: Role): void { this.role = role }
}


const funcionarioSchema = new Schema<IFuncionario>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email deve ser único
    password: { type: String, required: true },
    phone: { type: String, required: true },
    CPF: { type: String, required: true, unique: true }, // CPF deve ser único
    role: { type: String, enum: Object.values(Role), required: true, default: Role.USUARIO } 
}, { 
    timestamps: true,
    collection: 'funcionarios' // Define o nome da collection no MongoDB
})


funcionarioSchema.loadClass(FuncionarioClass)


const Funcionario = mongoose.model<IFuncionario>('Funcionario', funcionarioSchema)
export default Funcionario