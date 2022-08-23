import { body, param, query } from "express-validator";
import Category from "../../models/Category";

export class CategoryValidators {
  static create() {
    return [
      body("name", "name is Required").isString(),
      body("description", "description is Required").isString(),
    ];
  }
  static update() {
    return [param("id", "id is Required")];
  }
  static delete() {
    return [param("id", "id is Required")];
  }
  static get() {
    return [param("id", "id is Required")];
  }
  
}

//
