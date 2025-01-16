import { Iadmin } from './adminModelInterface';
import { Istudent } from './studentModelInterface';

export interface IadminService {
    LoginAdmin(email:string,password:string):Promise<boolean|Iadmin>
    findStudent():Promise <Istudent[] | null >
    findStudentByEmail(email:string):Promise <Istudent | null>
    edit(email:string,name:string,clas:number,roleno:number):Promise<boolean>
    delete(email:string):Promise <boolean>
}