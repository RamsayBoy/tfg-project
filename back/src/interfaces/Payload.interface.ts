// TODO: Move together with Token.type.ts
export default interface TokenInfo {
    payload: {
        id: number;
        role?: string;
        teacherId?: number;
    }
    iat: number;
    exp: number;
}

