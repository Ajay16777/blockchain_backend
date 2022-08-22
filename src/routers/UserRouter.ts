import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { UserValidators } from "./validators/UserValidators";

class UserRouter {
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
      "/user_data",
      GlobalMiddleWare.authenticate,
      UserController.userData
    );

    // //soical login
    // this.router.get(
    //   "/social/:id",
    //   GlobalMiddleWare.authenticate,
    //   UserController.socialLogin
    // );
    // this.router.get(
    //   "/social/:id/:token",
    //   GlobalMiddleWare.authenticate,
    //   UserController.socialLogin
    // );
  }
  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.signup(),
      GlobalMiddleWare.checkError,
      UserController.signup
    );

    this.router.post(
      "/login",
      UserValidators.login(),
      GlobalMiddleWare.checkError,
      UserController.login
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      UserController.updateUserData
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      UserController.deleteUserData
    );
  }
}

export default new UserRouter().router;
