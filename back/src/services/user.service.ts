import {userRepository} from '../repositories/user.repository';
import User from '../types/User.type';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JwtToken } from '../types/Token.type';

// TODO: Dependency injection
export default class UserService {
    async getByEmailAndPassword(email: string, password: string): Promise<{user: User, token: JwtToken}> {
        const user: User = await userRepository.getByEmailAndPassword(email, password);

        let token: JwtToken = undefined;

        if (user) {
            token = jwt.sign({id: user.id}, config.TOKEN_SECRET, {
                // Expires in a day
                expiresIn: 60 * 60 * 24,
            });
        }

        return {user, token};
    }
}

// TODO: Remove when dependency injection
const userService = new UserService();
export {userService};
