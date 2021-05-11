import config from "../config";
import { JwtToken } from "../types/Token.type";
import jwt from 'jsonwebtoken';

// TODO: Dependency injection
export default class AuthService {
    generateToken(payload: { id: number,  role?: string }, expirateInTime: number): JwtToken {
        const token: JwtToken = jwt.sign({ payload }, config.TOKEN_SECRET, {
            expiresIn: expirateInTime,
        });
        return token;
    }
}

// TODO: Remove when dependency injection
const authService = new AuthService();
export { authService };
