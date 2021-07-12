import Class from '../interfaces/Class.interface';
import database from '../mysql';

// TODO: Dependency injection
export default class ClassRepository {
    async getAll(teacherId: number, date: Date): Promise<Class[]> {
        return new Promise((resolve, reject) => {
            const query = `
                    SELECT id, date, duration, numMaxClients, teacherId
                    FROM class
                    WHERE teacherId = ${teacherId}
                        AND DATE(date) = '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

// TODO: Remove when dependency injection
const classRepository = new ClassRepository();
export {classRepository};
