interface Locals {
    userId: number;
    userRole?: string;
    teacherId?: number;
}

declare module 'express' {
    export interface Reponse {
        locals: Locals,
    }
}
