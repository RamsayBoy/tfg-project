export class CustomError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "CustomError";
    }
}
