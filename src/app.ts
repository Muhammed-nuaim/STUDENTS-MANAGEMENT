import express, {Application,Request,Response} from "express";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import nocache from "nocache";

//Route
import { StudentRoute } from "./routes/studentRoutes";
import { AdminRoute } from "./routes/adminRoutes";

//student //admin
import { StudentRepository } from "./repository/studentRepository";
import { StudentService } from "./services/studentServices";
import { StudentController } from "./controller/studentController";
import { AdminRepository } from "./repository/adminRepositoty";
import { AdminService } from "./services/adminServices";
import { AdminController } from "./controller/adminController";

declare module 'express-session'{
    interface SessionData{
        student?:string|null;
        admin?:string|null;
    }
}

export class App {
    public app: Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.setMiddleWare();
        this.setAdminRoute();
        this.setStudentRoute();
        this.setupViewEngine();
    }

    private setupViewEngine() {
        this.app.set("views", path.join(__dirname, "views"));    
        this.app.set("view engine", "ejs");
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
        const studentRepository = new StudentRepository()
        const studentService = new StudentService(studentRepository);
        const studentController = new StudentController(studentService);
        const studentRoutes = new StudentRoute(studentController)
        this.app.use('/',studentRoutes.getStudentRoute());
    }

    private setAdminRoute() {
        const adminRepository = new AdminRepository();
        const adminServices = new AdminService(adminRepository);
        const adminController = new AdminController(adminServices);
        const adminRoutes = new AdminRoute(adminController);
        this.app.use('/admin',adminRoutes.getAdminRoute());
    }

    public getApp() {
        return this.app;
    }
}