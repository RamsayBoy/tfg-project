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

    async joinClass(userId: number, classId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO client_class (
                    client_id,
                    class_id
                )
                VALUES (
                    ${userId},
                    ${classId}
                )
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                resolve(true);
            });
        });
    }
}

// TODO: Remove when dependency injection
const classRepository = new ClassRepository();
export {classRepository};
