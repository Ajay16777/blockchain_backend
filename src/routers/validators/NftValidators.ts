import { body, param, query } from "express-validator";
import Nft from "../../models/Nft";

export class NftValidators {
  static create() {
    return [
      body("name", "name is Required").isString(),
      body("description", "description is Required").isString(),
      body("image", "image is Required").isString(),
      body("price", "price is Required").isString(),
      body("category", "category is Required").isString(),
    ];
  }
  static update() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const nft = await Nft.findById(id);
        if (!nft) {
          throw new Error("Nft not found");
        }
        if (nft.owner!== req.user._id) {
          throw new Error("You are not authorized to update this nft");
        }
        return true;
      }),
    ];
  }
  static delete() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const nft = await Nft.findById(id);
        if (!nft) {
          throw new Error("Nft not found");
        }
        if (nft.owner!== req.user._id) {
          throw new Error("You are not authorized to delete this nft");
        }
        return true;
      }),
    ];
  }
  static get() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const nft = await Nft.findById(id);
        if (!nft) {
          throw new Error("Nft not found");
        }
        return true;
      }),
    ];
  }
}
