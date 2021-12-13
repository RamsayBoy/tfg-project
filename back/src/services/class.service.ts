import Class from "../interfaces/Class.interface";
import Client from "../interfaces/Clients.interface";
import ResponseWrapped from "../interfaces/ResponseWrapped.interface";
import { classRepository } from "../repositories/class.repository";
import { userService } from "./user.service";

// TODO: Dependency injection
export default class ClassService {
    async getAll(userId: number, teacherId: number, date: Date): Promise<Class[]> {
        const classes: Class[] = await classRepository.getAll(teacherId, date);

        for(let i = 0; i < classes.length; i++){
            classes[i].isUserJoined = await classRepository.isUserJoinedToClass(userId, classes[i].id);
            classes[i].usersJoined = await this.getUsersJoined(classes[i].id);
        }
        
        return classes;
    }

    async getUsersJoined(classId: number): Promise<Client[]> {
        let clients: Client[] = await classRepository.getUsersJoined(classId);
        clients = await userService.setDefaultProfileImageToClientsWithoutIt(clients);

        return clients;
    }

    async joinClass(userId: number, classId: number): Promise<boolean> {
        return await classRepository.joinClass(userId, classId);
    }

    async removeUserFromClass(userId: number, classId: number): Promise<boolean> {
        return await classRepository.removeUserFromClass(userId, classId);
    }

    async isClassValid(classToAdd: Class): Promise<ResponseWrapped | null> {          
        const classIsBetweenAnother: boolean = await classRepository
            .isClassBetweenAnotherOne(classToAdd);

        if (classIsBetweenAnother) {
            const responseWrapped: ResponseWrapped = {
                status: 409,
                statusText: 'Conflict',
                message: `La clase no se ha podido añadir porque interfiere con la fecha y la hora de otra.`,
                error: {
                    code: 'CONFLICT',
                    message: `La clase no se ha podido añadir porque interfiere con la fecha y la hora de otra.`,
                }
            };

            return responseWrapped;
        }

        return null;
    }

    async addClass(classToAdd: Class): Promise<boolean> {        
        return await classRepository.addClass(classToAdd);
    }

    async removeClass(teacherId: number, classId: number): Promise<boolean> {
        return await classRepository.removeClass(teacherId, classId);
    }

    async addTeacherToClassAndFixDate(teacherId: number, classToAdd: Class): Promise<Class> {
        // Transform string date to Date object for using Date object methods
        // const auxDate = new Date(classToAdd.date);
        // classToAdd.date = auxDate;
        classToAdd.date = new Date(classToAdd.date);
        // Add teacherId to the class so only classToAdd is passed to addClass function
        classToAdd.teacherId = teacherId;

        return classToAdd;
    }

    async isClassAvailable(classId: number): Promise<ResponseWrapped | null> {
        let errorMessage = '';
        
        const classInfo: Class = await this.getById(classId);
        const classUsers: Client[] = await this.getUsersJoined(classId);
        
        if (classInfo.numMaxClients === classUsers.length) {
            errorMessage = `No se ha podido unir a la clase porque están todas las plazas ocupadas.`;
        }
        else if(await this.isAPastClass(classInfo)) {
            errorMessage = `No se puede unir a una clase que ya ha pasado.`;
        }

        if (errorMessage) {
            const responseWrapped: ResponseWrapped = {
                status: 409,
                statusText: 'Conflict',
                message: errorMessage,
                error: {
                    code: 'CONFLICT',
                    message: errorMessage,
                }
            };

            return responseWrapped;
        }

        return null;
    }

    async isAPastClass(classObject: Class): Promise<boolean> {
        const currentTime: number = (Math.floor((new Date).getTime() / 1000));
        const classTime: number = (Math.floor((classObject.date).getTime() / 1000)) + await this.getSecondsFromTime(classObject.duration);
    
        return currentTime > classTime;
      }

    async getSecondsFromTime(time: string): Promise<number> {
        const parts = time.split(':');
        return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
    }

    async getById(classId: number): Promise<Class> {
        return await classRepository.get(classId);
    }
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
