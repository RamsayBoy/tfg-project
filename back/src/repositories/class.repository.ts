import Class from '../interfaces/Class.interface';
import Client from '../interfaces/Clients.interface';
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
                    ORDER BY date ASC
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

    async addClass(classToAdd: Class): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO class
                (date, duration, numMaxClients, teacherId)
                VALUES
                ('${classToAdd.date.getFullYear()}-${classToAdd.date.getMonth() + 1}-${classToAdd.date.getDate()} ${classToAdd.date.toLocaleTimeString()}',
                 '${classToAdd.duration}',
                 ${classToAdd.numMaxClients},
                 ${classToAdd.teacherId});
            `;

            database.query(query, (error, results) => {
                console.log(`class.repository > addClass: \nerror -> ${error} \nresults -> ${results}`);
                if (error) return reject(false);
                resolve(true);
            });
        });
    }

    async hasClassAlreadyExists(classToAdd: Class): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 1 FROM class c
                WHERE c.date = '${classToAdd.date.getFullYear()}-${classToAdd.date.getMonth() + 1}-${classToAdd.date.getDate()} ${classToAdd.date.toLocaleTimeString()}'
            `;

            database.query(query, (error, results) => {
                if (error || results === []) return reject(false);
                resolve(true);
            });
        });
    }

    async isClassBetweenAnotherOne(classToAdd: Class): Promise<boolean> {
        const classToAddDate = `${classToAdd.date.getFullYear()}-${classToAdd.date.getMonth() + 1}-${classToAdd.date.getDate()}`;
        let classToAddStartTime = `${classToAdd.date.toLocaleTimeString()}`;

        // Check that there are 2 digits on hour part
        if (classToAddStartTime.split(':')[0].length === 1) {
            classToAddStartTime = '0' + classToAddStartTime;
        }
        
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 1 FROM class c
                WHERE
                    -- Check for same day classes
                    DATE(c.date) = '${classToAddDate}'
                    -- Check if there is no class being given where the class to add is going to be added
                    AND
                    (
                        -- Check if class start time is not between the start and end time of the new class
                        TIME(c.date) > '${classToAddStartTime}' AND TIME(c.date) < '${this.getEndTime(classToAdd)}'
                        -- Check if class end time is not between the start and end time of the new class
                        OR SEC_TO_TIME((TIME_TO_SEC(TIME(date)) + TIME_TO_SEC(duration))) > '${classToAddStartTime}'
                           AND SEC_TO_TIME((TIME_TO_SEC(TIME(date)) + TIME_TO_SEC(duration))) < '${this.getEndTime(classToAdd)}'
                    )
                LIMIT 1;
            `;

            database.query(query, (error, results) => {
                if (error || results === []) return reject(false);
                resolve(results.length !== 0);
            });
        });
    }

    // TODO: This method is used on angular too. Refactor creating a class for example
    //  getDurationPeriod is the name in angular but it does almost the same
    getEndTime(classToGetEndTime: Class): string {
        const date = classToGetEndTime.date;
        const secondsToEnd = this.getSecondsFromTime(classToGetEndTime.duration);
        const endDate = new Date(date);

        endDate.setSeconds(date.getSeconds() + secondsToEnd);

        let endHour = endDate.getHours().toString();
        endHour = ("0" + endHour).slice(-2);

        // Add 0 if there is only one digit
        if (endHour.length === 1) endHour = '0' + endHour;

        let endMinutes = endDate.getMinutes().toString();
        endMinutes = ("0" + endMinutes).slice(-2);

        return `${endHour}:${endMinutes}:00`;
    }

    // TODO: This method is used on angular too. Refactor creating a class for example
    getSecondsFromTime(time: string): number {
        const parts = time.split(':');
        return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
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

    async getUsersJoined(classId: number): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT c.id, u.name, lastName, email, r.name 'role'
                FROM client c
                INNER JOIN client_class cc ON cc.client_id = c.id
                INNER JOIN user u ON u.id = c.id
                INNER JOIN role r ON r.id = u.roleId
                WHERE class_id = ${classId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                resolve(results);
            });
        });
    }

    async get(classId: number): Promise<Class> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id, date, duration, numMaxClients, teacherId
                FROM class
                WHERE id = ${classId};
            `;

            database.query(query, (error, results) => {
                if (error) return reject(false);
                
                const returnedClass: Class = {
                    id: results[0].id,
                    date: new Date(results[0].date),
                    duration: results[0].duration,
                    isUserJoined: false,
                    numMaxClients: results[0].numMaxClients,
                    teacherId: results[0].teacherId,
                    usersJoined: []
                }

                resolve(returnedClass);
            });
        });
    }
}

// TODO: Remove when dependency injection
const classRepository = new ClassRepository();
export {classRepository};
