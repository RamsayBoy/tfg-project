import Class from "../interfaces/Class.interface";
import { classRepository } from "../repositories/class.repository";

// TODO: Dependency injection
export default class ClassService {
    async getAll(teacherId: number, date: Date): Promise<Class[]> {
        return await classRepository.getAll(teacherId, date);
    }
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
