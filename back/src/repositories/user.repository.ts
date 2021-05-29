import database from '../mysql';
import User from '../interfaces/User.interface';

// TODO: Dependency injection
export default class UserRepository {
    async getByEmailAndPassword(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, email, r.name as role
                FROM user u
                INNER JOIN role r ON r.id = u.roleId
                WHERE email = '${email}' AND
                    password = '${password}';
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }
}

// TODO: Remove when dependency injection
const userRepository = new UserRepository();
export {userRepository};
