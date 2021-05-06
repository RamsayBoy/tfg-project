import database from '../mysql';

// TODO: Dependency injection
export default class UserRepository {
    async getByEmailAndPassword(email: string, password: string) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, email, r.name as role
                FROM user u
                INNER JOIN role r ON r.id = u.id
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
export const userRepository = new UserRepository();
