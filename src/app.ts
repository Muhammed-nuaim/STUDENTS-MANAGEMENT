import express, {Application,Request,Response} from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import nocache from "nocache";

//studentRoute
// import {studentRoute} from "./routes/studentRoutes";

//student
// import {studentRepository} from "./repository/"

declare module 'express-session' {
    interface SesssionData{
        student?:string|null;
        admin?:String|null;
    }
}

export class App {
    public app: Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.setMiddleWare();
        // this.setAdminRoute();
        this.setStudentRoute;
    }

    private setMiddleWare():void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        this.app.use(
            session({
                secret: "secrest",// You should store this in .env file
                resave:false,
                saveUninitialized:true,
            })
        );

        this.app.use(nocache());
        this.app.use(flash());
        // Middleware to make flash messages available in the view templates
        this.app.use((req: Request,res: Response, next: () => void) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();
        })
    }

    private setStudentRoute() {
        // const studentRepository = new studentRepository();
        // const studentServices = new studentService(studentRepository);
        // const studentController = new studentController(studentServices);
        // const studentRoutes = new studentRoute(studentController);
        // this.app.use('/',studentRoutes.getStudentRoute());
    }

    private setAdminRoute() {
        // const adminRepository = new adminRepository();
        // const adminServices = new adminService(adminRepository);
        // const adminController = new adminController(adminServices);
        // const adminRoutes = new adminRoute(adminController);
        // this.app.use('/admin',adminRoutes.getAdminRoute());
    }

    public getApp() {
        return this.app;
    }
}