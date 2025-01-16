import { promises } from "dns";
import {Istudent} from "./studentModelInterface";

export interface IstudentService {
    createStudent(student:Istudent):Promise<Istudent|boolean>
    loginStudent(email:string,password:string):Promise <boolean | Istudent>
    findStudent(email:string):Promise <Istudent | null >
    editStudent(student:Istudent,email:string):Promise <Istudent |boolean>
}