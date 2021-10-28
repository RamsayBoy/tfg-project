import database from '../mysql';
import User from '../interfaces/User.interface';

// TODO: Dependency injection
export default class UserRepository {
    async getById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, u.name, u.lastName, email, r.name as role, teacherId
                FROM user u
                INNER JOIN role r ON r.id = u.roleId
                LEFT JOIN client c ON c.id = u.id
                WHERE u.id = ${id};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }

    async getByEmailAndPassword(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, u.name, u.lastName, email, r.name as role, teacherId
                FROM user u
                INNER JOIN role r ON r.id = u.roleId
                LEFT JOIN client c ON c.id = u.id
                WHERE email = '${email}' AND
                    password = '${password}';
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }

    async isAdmin(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT r.name AS rol
                FROM user
                INNER JOIN role r ON r.id = user.roleId
                WHERE user.id = ${userId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0].rol === 'admin' ? true : false);
            });
        });
    }

    async isAlreadyRegistered(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT email
                FROM user
                WHERE email = '${email}';
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results.length !== 0 ? true : false);
            });
        });
    }

    async register(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO user(
                    email,
                    password,
                    roleId)
                VALUES
                    ('${email}', '${password}', 1); -- 1 is 'user' role
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve();
            });
        });
    }
}

// TODO: Remove when dependency injection
const userRepository = new UserRepository();
export {userRepository};
