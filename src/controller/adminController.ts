import { Istudent } from "../interfaces/studentModelInterface";
import { Iadmin } from "../interfaces/adminModelInterface";
import { Response, Request } from "express";
import { IadminService } from "../interfaces/adminServiceInterface";

export class AdminController {
    private adminServices: IadminService;

    constructor(adminService: IadminService) {
        this.adminServices = adminService;
    }

    async adminLogin(req: Request , res: Response): Promise<void> {
        try{
            const email:string = req.body.email;
            const password:string = req.body.password;

            const result:boolean | Iadmin = await this.adminServices.LoginAdmin(
                email,
                password
            );

            if(result) {
                req.session.admin = email;
                res.redirect("/admin/home");
            } else {
                req.flash("error_msg", "Wrong mail and Password");
                res.redirect("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loadAdminLogin(req: Request ,res: Response ):Promise<void> {
        try {
            res.render("admin/login");
        } catch (error) {
            console.log(error);
        }
    }

    async loadHome(req:Request , res:Response):Promise<void> {
        try {
            if(req.session.admin) {
                const result:null | Istudent[] = await this.adminServices.findStudent();
                if(result) {
                    res.render("admin/home", {result });
                } else{
                    req.flash("error_msg", "cannot fetch student data");
                    res.redirect("/admin");
                }
            } else {
                req.flash("error_msg", "Please Login");
                res.redirect("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loadEdit(req:Request,res: Response) {
        try {
            if(req.session.admin) {
                const email:string = req.params.id;
                const userData = await this.adminServices.findStudentByEmail(email);

                if(userData) {
                    res.render("admin/editUser", { userData });
                } else {
                    req.flash("error_msg", "cannot fetch data from database");
                    res.redirect("/admin/home");
                }
            } else {
                req.flash("error_msg","Please login session expired");
                res.redirect("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async edit(req:Request, res:Response):Promise<void> {
        try {
            if(req.session.admin) {
                const email: string = req.params.id;
                const name: string = req.body.name;
                const clas: number = req.body.clas;
                const roleno: number = req.body.roleno;
                const result:boolean = await this.adminServices.edit(
                    email,
                    name,
                    clas,
                    roleno
                );

                if(result) {
                    req.flash("success_msg","updated successfully");
                    res.redirect("/admin/home");
                } else {
                    req.flash("error_msg","data updation failded");
                    res.redirect("/admin/home");
                }
            } else {
                req.flash("error_msg","Please login session expired");
                res.redirect("/admin");
            }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
          const email: string = req.params.id;
          const result: boolean = await this.adminServices.delete(email);
          if (result) {
            req.flash("success_msg", "deleted successfully ");
            res.redirect('/admin/home');
          }else{
            req.flash("error_msg", "data deletion failed");
            res.redirect('/admin/home');
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      async logout(req:Request,res:Response):Promise<void>{
        try {
          req.session.destroy((err) =>{
            if(err){
              console.error('Error destroying session:', err);
              return res.status(500).send('Failed to log out');
            }
            return res.redirect('/admin');
          })
          
        } catch (error) {
          console.log(error)
        }
      }
}