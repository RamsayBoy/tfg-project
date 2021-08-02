import User from "./User.interface";

// TODO: Change Class.type.ts to User.interface.ts and change to another folder
export default interface Class {
    id: number,
    date: Date,
    duration: string,
    numMaxClients: number,
    teacherId: number,
    usersJoined: User[],
    isUserJoined: boolean,
}
