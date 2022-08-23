import { body, param, query } from "express-validator";
import Collection from "../../models/Collection";

export class CollectionValidators {
  static create() {
    return [
      body("name", "name is Required").isString(),
      body("description", "description is Required").isString(),
      body("image", "image is Required").isString(),
    ];
  }
  static update() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const collection = await Collection.findById(id);
        if (!collection) {
          throw new Error("Collection not found");
        }
        if (collection.owner !== req.user._id) {
          throw new Error("You are not authorized to update this collection");
        }
        return true;
      }),
    ];
  }
  static delete() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const collection = await Collection.findById(id);
        if (!collection) {
          throw new Error("Collection not found");
        }
        if (collection.owner !== req.user._id) {
          throw new Error("You are not authorized to delete this collection");
        }
        return true;
      }),
    ];
  }
  static get() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const collection = await Collection.findById(id);
        if (!collection) {
          throw new Error("Collection not found");
        }
        return true;
      }),
    ];
  }

//   addNft()
   static addNft() {
    return [
        //Check if user is owner of nft
        param("id", "id is Required").custom(async (id, { req }) => {
            const collection = await Collection.findById(id);
            if (!collection) {
                throw new Error("Collection not found");
            }
            if (collection.owner !== req.user._id) {
                throw new Error("You are not authorized to add this nft to this collection");
            }
            return true;
        }),
        body("nftId", "nftId is Required").isString(),
    ];
}


//   removeNft()
    static removeNft() {
        return [
            //Check if user is owner of nft
            param("id", "id is Required").custom(async (id, { req }) => {
                const collection = await Collection.findById(id);
                if (!collection) {
                    throw new Error("Collection not found");
                }
                if (collection.owner !== req.user._id) {
                    throw new Error("You are not authorized to remove this nft from this collection");
                }
                return true;
            }),
            body("nftId", "nftId is Required").isString(),
        ];
    }

    
}
