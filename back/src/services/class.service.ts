import Class from "../interfaces/Class.interface";

// TODO: Dependency injection
export default class ClassService {
    async getAll(): Promise<Class[]|null> {
        // TODO
        //const classes: Class[] = await classRepository.getAll();

        return null;
    }
}

// TODO: Remove when dependency injection
const classService = new ClassService();
export {classService};
