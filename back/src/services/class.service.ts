import Class from "../interfaces/Class.interface";
import { classRepository } from "../repositories/class.repository";

// TODO: Dependency injection
export default class ClassService {
    async getAllByTeacherId(teacherId: number): Promise<Class[]> {
        return await classRepository.getAllByTeacherId(teacherId);
    }
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
