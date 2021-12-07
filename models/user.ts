import { ObjectId } from "mongodb";

export default interface User {
  name: string;
  age: number;
  email: string;
  id?: ObjectId;
}
