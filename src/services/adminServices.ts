import { Iadmin } from  '../interfaces/adminModelInterface';
import { Istudent } from '../interfaces/studentModelInterface';

import { IadminRepository } from '../interfaces/adminRepositoryInterface';
import { BcryptPass } from '../utils/bcrypt';
import { IadminService } from '../interfaces/adminServiceInterface';

export class AdminService implements IadminService {
    private adminRepository:IadminRepository;
    private bcryptPass:BcryptPass;
    constructor(adminRepository:IadminRepository) {
        this.adminRepository = adminRepository;
        this.bcryptPass = new BcryptPass();
    }

    async LoginAdmin(email: string, password: string): Promise<boolean | Iadmin> {
        const findByEmail = await this.adminRepository.findByEmail(email);

        if(findByEmail) {
            const isPasswordMatch = await this.bcryptPass.comparePassword(password,findByEmail.password);
            if(isPasswordMatch) {
                return findByEmail;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async findStudent(): Promise<Istudent[] | null> {
        const findStudents = await this.adminRepository.findStudent();

        if(findStudents) {
            return findStudents
        }
        return null;
    }

    async findStudentByEmail(email: string): Promise<Istudent | null> {
        const findStudent = await this.adminRepository.findStudenByEmail(email);

        if(findStudent) {
            return findStudent;
        } else {
            return null;
        }
    }

    async edit(email: string, name: string, clas: number, roleno: number): Promise<boolean> {
        const findStudent = await this.adminRepository.edit(email,name,clas,roleno);
        if(findStudent) {
            return true
        } else {
            return false;
        }
    }

    async delete(email: string): Promise<boolean> {
        const findStudent = await this.adminRepository.delete(email);
        if(findStudent) {
            return true;
        } else {
            return false;
        }
    }
}