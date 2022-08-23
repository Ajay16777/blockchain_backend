import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { AdminValidators } from "./validators/AdminValidators";

class AdminRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/admin_data",
      GlobalMiddleWare.adminAuthenticate,
      GlobalMiddleWare.checkError,
      AdminController.getAdminData     
    );
  }
  postRoutes() {
    this.router.post(
      "/signup",
      AdminValidators.Signup(),
      GlobalMiddleWare.checkError,
      AdminController.signup
    );

    this.router.post(
      "/login",
      AdminValidators.login(),
      GlobalMiddleWare.checkError,
      AdminController.login
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.adminAuthenticate,
      AdminValidators.update(),
      GlobalMiddleWare.checkError,
      AdminController.updateAdmin
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.adminAuthenticate,
      AdminValidators.delete(),
      GlobalMiddleWare.checkError,
      AdminController.deleteAdmin
    );
  }
}

export default new AdminRouter().router;
