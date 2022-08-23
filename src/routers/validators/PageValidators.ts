import { body, param, query } from "express-validator";
import Pages from "../../models/Pages";

export class PageValidators {
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
        const page = await Pages.findById(id);
        if (!page) {
          throw new Error("Page not found");
        }
        return true;
      }),
    ];
  }
  static delete() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const page = await Pages.findById(id);
        if (!page) {
          throw new Error("Page not found");
        }
        return true;
      }),
    ];
  }
  static get() {
    return [
      //Check if user is owner of nft
      param("id", "id is Required").custom(async (id, { req }) => {
        const page = await Pages.findById(id);
        if (!page) {
          throw new Error("Page not found");
        }
        return true;
      }),
    ];
  }
}
// }
