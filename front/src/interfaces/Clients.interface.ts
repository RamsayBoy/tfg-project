import User from "./User.interface";

type Image = string | null;

export default interface Client {
  user: User,
  profileImage: Image,
}
