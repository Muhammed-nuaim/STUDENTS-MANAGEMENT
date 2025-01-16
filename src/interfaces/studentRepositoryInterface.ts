import { Istudent } from "./studentModelInterface";

export interface IstudentRepository{
    createStudent(student:Istudent):Promise<Istudent>;
    findByEmail(email:string):Promise<Istudent | null>;
    editStudent(student:Istudent,email:string):Promise <Istudent|null>
}