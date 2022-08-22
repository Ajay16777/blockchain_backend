"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const UserValidators_1 = require("./validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/user_data", GlobalMiddleWare_1.GlobalMiddleWare.authenticate, UserController_1.UserController.userData);
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
        this.router.post("/signup", UserValidators_1.UserValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.signup);
        this.router.post("/login", UserValidators_1.UserValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.login);
    }
    patchRoutes() {
        this.router.patch("/update", GlobalMiddleWare_1.GlobalMiddleWare.authenticate, GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.updateUserData);
    }
    deleteRoutes() {
        this.router.delete("/delete", GlobalMiddleWare_1.GlobalMiddleWare.authenticate, GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.deleteUserData);
    }
}
exports.default = new UserRouter().router;
