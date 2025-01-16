import bcrypt,{compare} from 'bcrypt'

export class BcryptPass{

    public async hashPassword(password:string):Promise<string>{
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword;
    }

    public async comparePassword(currentPassword:string,passwordInDB:string):Promise<boolean> {
        return await bcrypt.compare(currentPassword,passwordInDB)
    }
}