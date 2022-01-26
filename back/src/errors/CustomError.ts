export class CustomError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "CustomError";

        // For beeing able to use instance of
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
