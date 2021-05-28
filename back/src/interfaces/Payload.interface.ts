// TODO: Move together with Token.type.ts
export default interface Payload {
    id: number;
    role?: string;
    teacherId?: number;
    iat: number;
    exp: number;
}
