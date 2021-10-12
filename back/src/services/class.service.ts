import Class from "../interfaces/Class.interface";
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

    async addClass(teacherId: number, classToAdd: Class): Promise<boolean> {
        // Transform string date to Date object for using Date object methods
        classToAdd.date = new Date(classToAdd.date);
        // Add teacherId to the class so only classToAdd is passed to addClass function
        classToAdd.teacherId = teacherId;
        
        return await classRepository.addClass(classToAdd);
    }

    async removeClass(teacherId: number, classId: number): Promise<boolean> {
        return await classRepository.removeClass(teacherId, classId);
    }
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
