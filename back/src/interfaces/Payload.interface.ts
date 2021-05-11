// TODO: Move together with Token.type.ts
export default interface Payload {
    id: number;
    role?: string;
    iat: number;
    exp: number;
}
