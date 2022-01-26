import {userRepository} from '../repositories/user.repository';
import User from '../interfaces/User.interface';
import Client from '../interfaces/Clients.interface';
import config from '../config'
import { CustomError } from '../errors/CustomError';

// TODO: Dependency injection
export default class UserService {
    async getById(id: number): Promise<User> {
        let user: User = await userRepository.getById(id);

        user = this.setDefaultProfileImage(user);
        
        return user;
    }

    async getByEmail(email: string): Promise<User|null> {
        const user: User = await userRepository.getByEmail(email);

        if (!user) {
            return null;
        }

        return user;
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

    async getClients(teacherId: number): Promise<Client[]> {
        const clients: Client[] = await userRepository.getClients(teacherId);

        clients.forEach(user => {
            if(!user.profileImage) {
                user.profileImage = config.DEFAULT_PROFILE_IMAGE_PATH;
            }
        });

        return clients;
    }

    // async getClient(userId: number): Promise<Client> {
    //     let client: Client = await userRepository.getClient(userId);

    //     client = this.setDefaultProfileImageToClient(client);

    //     return client;
    // }

    async setDefaultProfileImageToClientsWithoutIt(clients: Client[]): Promise<Client[]> {
        clients.forEach(user => {
            if(!user.profileImage) {
                user = this.setDefaultProfileImage(user);
            }
        });

        return clients;
    }

    setDefaultProfileImage(client: User | Client): Client {
        client.profileImage = config.DEFAULT_PROFILE_IMAGE_PATH;
        return client;
    }

    async removeClient(clientId: number): Promise<boolean> {
        return await userRepository.removeClient(clientId);
    }

    async updateUser(user: User): Promise<User | null> {
        // Check if email exists (but is not the same)
        if (await userRepository.isUserEmailAlreadyRegistered(user)) {
            throw new CustomError("El email introducido ya existe");
        }

        await userRepository.updateUser(user);

        return await userRepository.getById(user.id);
    }
}

// TODO: Remove when dependency injection
const userService = new UserService();
export {userService};
