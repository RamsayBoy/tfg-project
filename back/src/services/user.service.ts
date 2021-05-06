import {userRepository} from '../repositories/user.repository';
import User from '../types/User.type';

// TODO: Dependency injection
export default class UserService {
    async getByEmailAndPassword(email: string, password: string): Promise<User> {
        return await userRepository.getByEmailAndPassword(email, password);
    }
}

// TODO: Remove when dependency injection
const userService = new UserService();
export {userService};
