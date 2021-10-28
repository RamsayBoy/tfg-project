import {userRepository} from '../repositories/user.repository';
import User from '../interfaces/User.interface';

// TODO: Dependency injection
export default class UserService {
    async getById(id: number): Promise<User> {
        return await userRepository.getById(id);
    }

    async getByEmailAndPassword(email: string, password: string): Promise<User|null> {
        const user: User = await userRepository.getByEmailAndPassword(email, password);

        if (!user) {
            return null;
        }

        return user;
    }

    async isAdmin(userId: number): Promise<boolean> {
        const isAdmin: boolean = await userRepository.isAdmin(userId);

        return isAdmin;
    }
}

// TODO: Remove when dependency injection
const userService = new UserService();
export {userService};
