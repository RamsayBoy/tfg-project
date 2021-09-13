import Class from '../interfaces/Class.interface';
import User from '../interfaces/User.interface';
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

    async getUsersInfo(classId: number): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT client_id
                FROM client_class
                WHERE class_id = ${classId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    async isUserJoinedToClass(userId: number, classId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT client_id FROM client_class
                WHERE class_id = ${classId}
                    AND client_id = ${userId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results.length !== 0);
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

    async removeUserFromClass(userId: number, classId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM client_class
                WHERE client_id = ${userId}
                    AND class_id = ${classId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                resolve(true);
            });
        });
    }

    async removeClass(teacherId: number, classId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM class
                WHERE teacherId = ${teacherId}
                    AND id = ${classId};
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
