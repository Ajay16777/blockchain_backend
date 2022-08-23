import { Router } from "express";
import { NftController } from "../controllers/NftController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { NftValidators } from "./validators/NftValidators";

class NftRouter {
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
      "/nft_data",
      GlobalMiddleWare.authenticate,
      NftValidators.get(),
      GlobalMiddleWare.checkError,
      NftController.getNftData
    );
  }
  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.authenticate,
      NftValidators.create(),
      GlobalMiddleWare.checkError,
      NftController.createNft
    );
    
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.authenticate,
      NftValidators.update(),
      GlobalMiddleWare.checkError,
      NftController.updateNft
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.authenticate,
      NftValidators.delete(),
      GlobalMiddleWare.checkError,
      NftController.deleteNft
    );
  }
}

export default new NftRouter().router;
