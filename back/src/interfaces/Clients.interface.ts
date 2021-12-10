import User from "./User.interface";

type Image = string | null;

export default interface Client extends User {
  profileImage: Image,
}
