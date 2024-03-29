type Image = string | null;

// TODO: Change User.type.ts to User.interface.ts and change to another folder
export default interface User {
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
    profileImage: Image,
}
