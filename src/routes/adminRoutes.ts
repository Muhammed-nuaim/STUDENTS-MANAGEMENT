import Express, { Request, Response } from "express";
import { AdminController } from "../controller/adminController";

export class AdminRoute {
  private adminController: AdminController;
  private adminRouter: Express.Router;

  constructor(adminController: AdminController) {
    this.adminController = adminController;
    this.adminRouter = Express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.adminRouter.get("/", (req: Request, res: Response) => {
      this.adminController.loadAdminLogin(req, res);
    });
    this.adminRouter.post("/login", (req: Request, res: Response) => {
      this.adminController.adminLogin(req, res);
    });
    this.adminRouter.get("/home", (req: Request, res: Response) => {
      this.adminController.loadHome(req, res);
    });
    this.adminRouter.get("/edit/:id", (req: Request, res: Response) => {
      this.adminController.loadEdit(req, res);
    });
    this.adminRouter.post("/edit/:id", (req: Request, res: Response) => {
      this.adminController.edit(req, res);
    });
    this.adminRouter.get('/delete/:id',(req:Request,res:Response) =>{
        this.adminController.delete(req,res);
    })
    this.adminRouter.get('/logout',(req,res) =>{
        this.adminController.logout(req,res);
    })
  }
  public getAdminRoute(){
    return this.adminRouter;
  }
}
