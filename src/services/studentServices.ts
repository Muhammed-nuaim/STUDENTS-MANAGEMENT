import { Istudent } from "../interfaces/studentModelInterface";
import { IstudentRepository } from "../interfaces/studentRepositoryInterface";
import { IstudentService } from "../interfaces/studentServiceInterface";

import { BcryptPass } from "../utils/bcrypt";

export class StudentService implements IstudentService {
    
    private studentRepository:IstudentRepository;
    private bcryptPass:BcryptPass;

    constructor(studentRepository:IstudentRepository) {
        this.studentRepository = studentRepository;
        this.bcryptPass = new BcryptPass();
    }

    async createStudent(student: Istudent): Promise<Istudent | boolean> {
        if(!student.email) {
            throw new Error("Email is required");
        } 
        const findByEmail = await this.studentRepository.findByEmail(student.email);

        if(findByEmail) {
            return false;
        } else {
            const hashPassword = await this.bcryptPass.hashPassword(student.password);
            const studentData = {
                ...student,
                password: hashPassword
            };
            return await this.studentRepository.createStudent(studentData);
        }
    }

    async loginStudent(email: string, password: string): Promise<boolean | Istudent> {
        const findByEmail = await this.studentRepository.findByEmail(email);

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

    async findStudent(email: string): Promise<Istudent | null> {
        const findByEmail = await this.studentRepository.findByEmail(email);

        if(findByEmail) {
            return findByEmail;
        } else {
            return null;
        }
    }

    async editStudent(student: Istudent, email: string): Promise<Istudent | boolean> {
        const hashPassword = await this.bcryptPass.hashPassword(student.password);

        const studentData = {
            ...student,
            password:hashPassword
        }

        const updateStudents = await this.studentRepository.editStudent(studentData,email);
        return updateStudents ? true:false;
    }
}