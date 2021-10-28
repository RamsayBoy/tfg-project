import config from "../config";
import { JwtToken } from "../types/Token.type";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";

// TODO: Dependency injection
export default class AuthService {
    async generateToken(payload: { id: number,  role?: string }, expirateInTime: number): Promise<JwtToken> {
        const token: JwtToken = jwt.sign({ payload }, config.TOKEN_SECRET, {
            expiresIn: expirateInTime,
        });
        return token;
    }
    
    async isAlreadyRegistered(email: string): Promise<boolean> {
        return await userRepository.isAlreadyRegistered(email);
    }
    
    async register(email: string): Promise<void> {
        // TODO: Generate random password
        const password: string = email.substring(0, 3) + 'pass';
        console.log(password);
        await userRepository.register(email, password);
    }
}

// TODO: Remove when dependency injection
const authService = new AuthService();
export { authService };
