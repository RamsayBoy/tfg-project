import Class from "../interfaces/Class.interface";
import ResponseWrapped from "../interfaces/ResponseWrapped.interface";
import { classRepository } from "../repositories/class.repository";

// TODO: Dependency injection
export default class ClassService {
    async getAll(userId: number, teacherId: number, date: Date): Promise<Class[]> {
        const classes: Class[] = await classRepository.getAll(teacherId, date);

        for(let i = 0; i < classes.length; i++){
            classes[i].isUserJoined = await classRepository.isUserJoinedToClass(userId, classes[i].id);
        }
        
        return classes;
    }

    async joinClass(userId: number, classId: number): Promise<boolean> {
        return await classRepository.joinClass(userId, classId);
    }

    async removeUserFromClass(userId: number, classId: number): Promise<boolean> {
        return await classRepository.removeUserFromClass(userId, classId);
    }

    async isClassValid(classToAdd: Class): Promise<ResponseWrapped | null> {  
        // const hasClassAlreadyExists: Promise<boolean> = classRepository
        //     .hasClassAlreadyExists(classToValidate);
        
        // const isClassBetweenAnotherOne: Promise<boolean> = classRepository
        //     .isClassBetweenAnotherOne(classToValidate);

        // Check if only need isClassBetweenAnotherOne because it cover this case
        const classHasAlreadyExists: boolean = await classRepository
            .hasClassAlreadyExists(classToAdd);
        
        const classIsBetweenAnother: boolean = await classRepository
            .isClassBetweenAnotherOne(classToAdd);

        if (!classHasAlreadyExists) {
            const responseWrapped: ResponseWrapped = {
                status: 409,
                statusText: 'Conflict',
                message: `La clase no se ha podido añadir porque ya existe una con la misma fecha y hora.`,
                error: {
                    code: 'CONFLICT',
                    message: `La clase no se ha podido añadir porque ya existe una con la misma fecha y hora.`,
                }
            };

            return responseWrapped;
        }
        else if (!classIsBetweenAnother) {
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
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
