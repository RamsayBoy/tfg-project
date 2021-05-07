interface Locals {
    userId: number,
}

declare module 'express' {
    export interface Reponse {
        locals: Locals,
    }
}
