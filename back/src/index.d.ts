interface Locals {
    userId: number,
    userRole?: string;
}

declare module 'express' {
    export interface Reponse {
        locals: Locals,
    }
}
