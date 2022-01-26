import database from '../mysql';
import User from '../interfaces/User.interface';
import Client from '../interfaces/Clients.interface';

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

    async getByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, u.name, u.lastName, email, r.name as role, teacherId
                FROM user u
                INNER JOIN role r ON r.id = u.roleId
                LEFT JOIN client c ON c.id = u.id
                WHERE email = '${email}';
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

    async isUserEmailAlreadyRegistered(user: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT email
                FROM user
                WHERE email = '${user.email}' AND id != ${user.id};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results.length !== 0 ? true : false);
            });
        });
    }

    async register(name:string, lastName: string, email: string, password: string, teacherId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = `
                CALL sp_registerUser('${name}', '${lastName}', '${email}', '${password}', ${teacherId});
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve();
            });
        });
    }

    async getClients(teacherId: number): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT  c.id,
                        u.name,
                        u.lastName,
                        u.email,
                        r.name 'role'
                FROM client c
                LEFT JOIN user u ON u.id = c.id
                INNER JOIN role r ON r.id = u.roleId
                WHERE teacherId = ${teacherId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    // async getClient(userId: number): Promise<Client> {
    //     return new Promise((resolve, reject) => {
    //         const query = `
    //             SELECT  c.id,
    //                     u.name,
    //                     u.lastName,
    //                     u.email,
    //                     r.name 'role'
    //             FROM client c
    //             LEFT JOIN user u ON u.id = c.id
    //             INNER JOIN role r ON r.id = u.roleId
    //             WHERE clientId = ${userId};
    //         `;

    //         database.query(query, (error, results) => {
    //             if (error) return reject(error);
    //             console.log(results);
    //             resolve(results);
    //         });
    //     });
    // }

    async removeClient(clientId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM user
                WHERE id = ${clientId}
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                resolve(true);
            });
        });
    }

    async updateUser(user: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE user
                   SET  name = '${user.name}',
                        lastName = '${user.lastName}',
                        email = '${user.email}'
                WHERE id = ${user.id};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                resolve(true);
            });
        });
    }

    async getPasswordById(id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT password
                FROM user u
                WHERE id = '${id}';
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0].password);
            });
        });
    }

    async updatePassword(userId: number, newPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE user
                    SET password = '${newPassword}'
                WHERE id = ${userId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(true);
            });
        });
    }
}

// TODO: Remove when dependency injection
const userRepository = new UserRepository();
export {userRepository};
