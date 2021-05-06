import {userRepository} from '../repositories/user.repository';
import User from '../types/User.type';

// TODO: Dependency injection
export default class UserService {
    async getByEmailAndPassword(email: string, password: string): Promise<User> {
        const user: User = await userRepository.getByEmailAndPassword(email, password);

        // TODO: Check user email and password
        
        return user;
    }
}

// TODO: Remove when dependency injection
export const userService = new UserService();
