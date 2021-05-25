import Class from '../interfaces/Class.interface';
import database from '../mysql';

// TODO: Dependency injection
export default class ClassRepository {
    async getByEmailAndPassword(email: string, password: string): Promise<Class[]> {
        // TODO: Teacher ID is needed for getting all the classes
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id, date, duration, numMaxClients, teacherId
                FROM class
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    }
}

// TODO: Remove when dependency injection
const classRepository = new ClassRepository();
export {classRepository};
