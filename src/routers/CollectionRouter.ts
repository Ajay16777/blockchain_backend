import { Router } from "express";
import { CollectionController } from "../controllers/CollectionController";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CollectionValidators } from "./validators/CollectionValidators";

class CollectionRouter {
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
      "/collection_data/:id",
      GlobalMiddleWare.authenticate,
      CollectionValidators.get(),
      GlobalMiddleWare.checkError,
      CollectionController.getCollectionData
    );
  }
  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.authenticate,
      CollectionValidators.create(),
      GlobalMiddleWare.checkError,
      CollectionController.createCollection
    );

    //add nft to collection
    this.router.post(
      "/add_nft",
      GlobalMiddleWare.authenticate,
      CollectionValidators.addNft(),
      GlobalMiddleWare.checkError,
      CollectionController.addNftToCollection
    );

    //remove nft from collection
    this.router.post(
      "/remove_nft",
      GlobalMiddleWare.authenticate,
      CollectionValidators.removeNft(),
      GlobalMiddleWare.checkError,
      CollectionController.removeNftFromCollection
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update",
      GlobalMiddleWare.authenticate,
      CollectionValidators.update(),
      GlobalMiddleWare.checkError,
      CollectionController.updateCollection
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      GlobalMiddleWare.authenticate,
      CollectionValidators.delete(),
      GlobalMiddleWare.checkError,
      CollectionController.deleteCollection
    );
  }
}

export default new CollectionRouter().router;
