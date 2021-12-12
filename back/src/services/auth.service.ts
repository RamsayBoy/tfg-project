import config from "../config";
import { JwtToken } from "../types/Token.type";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";
import passGenerator from 'generate-password';
import bcrypt from 'bcrypt';

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
    
    async register(name: string, lastName: string, email: string, teacherId: number): Promise<void> {
        // Generate random password
        let password: string = passGenerator.generate({length: 10, numbers: true});
        // TODO: Remove console log when password can be know it
        console.log('password generated: ', password);
        
        // Hash the password
        password = await bcrypt.hash(password, 10);

        await userRepository.register(name, lastName, email, password, teacherId);
    }
}

// TODO: Remove when dependency injection
const authService = new AuthService();
export { authService };
