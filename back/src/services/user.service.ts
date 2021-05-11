import {userRepository} from '../repositories/user.repository';
import User from '../interfaces/User.interface';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JwtToken } from '../types/Token.type';

// TODO: Dependency injection
export default class UserService {
    async getByEmailAndPassword(email: string, password: string): Promise<User|null> {
        const user: User = await userRepository.getByEmailAndPassword(email, password);

        if (!user) {
            return null;
        }

        return user;
    }
}

// TODO: Remove when dependency injection
const userService = new UserService();
export {userService};
