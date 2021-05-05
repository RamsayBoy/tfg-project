import {UserRepository, userRepository} from '../repositories/user.repository';

// TODO: Dependency injection
export class UserService {
    
    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = userRepository;
    }

    async getByEmailAndPassword(email: string, password: string) {
        const user = await this._userRepository.getByEmailAndPassword(email, password);

        // TODO: Check user email and password
        
        return user;
    }
}

// TODO: Remove when dependency injection
export const userService = new UserService();
