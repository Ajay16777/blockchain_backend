import { Router } from "express";
import  {PageController}  from "../controllers/PageController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { PageValidators } from "./validators/PageValidators";

class PagesRouter {
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
      "/page_data/:id",
      GlobalMiddleWare.authenticate,
      PageValidators.get(),
      GlobalMiddleWare.checkError,
      PageController.getPageData
    );

    this.router.get(
      "/page_data",
      GlobalMiddleWare.authenticate,
      GlobalMiddleWare.checkError,
      PageController.getAllPages
    );
  }
  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.adminAuthenticate,
      PageValidators.create(),
      GlobalMiddleWare.checkError,
      PageController.createPage
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.adminAuthenticate,
      PageValidators.update(),
      GlobalMiddleWare.checkError,
      PageController.updatePage
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.adminAuthenticate,
      PageValidators.delete(),
      GlobalMiddleWare.checkError,
      PageController.deletePage
    );
  }
}

export default new PagesRouter().router;
