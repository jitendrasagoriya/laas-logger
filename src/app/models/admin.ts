import {Exception} from "./exception";

export class Admin {
  id: String;
  emailId: String;
  password: String;
  registrationDate: String;
  adminType: String;
  active: String;
  exception: Exception;
}
