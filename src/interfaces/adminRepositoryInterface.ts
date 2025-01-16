import { Iadmin } from "./adminModelInterface";
import { Istudent} from "./studentModelInterface";

export interface IadminRepository {
    findByEmail(email:string):Promise<Iadmin|null> 
    findStudent():Promise<Istudent[]|null>
    findStudenByEmail(email:string):Promise<Istudent | null>
    edit(email:string,name:string,clas:number,roleno:number):Promise <Istudent | null>
    delete(email:string):Promise <Istudent|null>
}