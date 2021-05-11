// TODO: Change User.type.ts to User.interface.ts and change to another folder
export default interface User {
    id: number,
    email: string,
    password: string,
    role?: string,
}
