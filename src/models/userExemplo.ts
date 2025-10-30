import mongoose, 
{
    Document,
    Schema
} from "mongoose";

export interface IUser extends Document {
    name: string
    

    getName(): string
    setName(n: string): void
}

class UserClass {
    name!: string

    constructor(name?: string) {
        if(name) this.name = name
    }

    getName(){return this.name}
    setName(n: string) {this.name = n}
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true}
}, {timestamps: true})

userSchema.loadClass(UserClass)

const User = mongoose.model<IUser>('User', userSchema)
export default User

