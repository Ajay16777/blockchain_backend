import { body, param, query } from "express-validator";
import Admin from "../../models/Admin";

export class AdminValidators {
  static Signup() {
    return [
      body("name", "name is Required").isString(),
      body("email", "email is Required").isString(),
      body("password", "password is Required").isString(),
    ];
  }
  static login() {
    return [
      body("email", "email is Required").isString(),
      body("password", "password is Required").isString(),
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
