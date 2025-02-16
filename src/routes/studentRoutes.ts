import Express, { Request, Response } from "express";
import { StudentController } from "../controller/studentController";

export class StudentRoute{
    private studentController : StudentController;
    private studentRouter:Express.Router;

    constructor(studentController:StudentController){
        this.studentController = studentController;
        this.studentRouter = Express.Router();
        this.setRoutes();
    }
    

    private setRoutes(){
        this.studentRouter.get('/',(req:Request,res:Response) =>{
            this.studentController.loadLoginStudent(req,res);
        });
        this.studentRouter.post('/login',(req:Request,res:Response) =>{
            this.studentController.loginStudent(req,res);
        });
        this.studentRouter.get('/register',(req:Request,res:Response) =>{
            this.studentController.loadRegisterStudent(req,res);
        })
        this.studentRouter.post('/register',(req:Request,res:Response)=>{
            this.studentController.registerStudent(req,res);
        })
        this.studentRouter.get('/home',(req:Request,res:Response)=>{
            this.studentController.loadHome(req,res);
        })
        this.studentRouter.get('/editUser',(req:Request,res:Response) =>{
            this.studentController.loadEditUser(req,res);
        })
        this.studentRouter.post('/editUser',(req:Request,res:Response) =>{
            this.studentController.editStudent(req,res);
        })
        this.studentRouter.get('/logout',(req:Request,res:Response) =>{
            this.studentController.logout(req,res);
        })
    }


    public getStudentRoute(){
        return this.studentRouter;
    }
}