import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CategoryValidators } from "./validators/CategoryValidators";

class CategoryRouter {
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
      "/category_data/:id",
      GlobalMiddleWare.authenticate,
      CategoryValidators.get(),
      GlobalMiddleWare.checkError,
      CategoryController.getCategoryData
    );

    this.router.get(
      "/category_data",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      CategoryController.getAllCategories
    );
  }
  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.adminAuthenticate,
      CategoryValidators.create(),
      GlobalMiddleWare.checkError,
      CategoryController.createCategory
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.adminAuthenticate,
      CategoryValidators.update(),
      GlobalMiddleWare.checkError,
      CategoryController.updateCategory
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.adminAuthenticate,
      CategoryValidators.delete(),
      GlobalMiddleWare.checkError,
      CategoryController.deleteCategory
    );
  }
}

export default new CategoryRouter().router;
