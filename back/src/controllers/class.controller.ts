import {Request, Response} from 'express';
import Class from "../interfaces/Class.interface";
import ResponseWrapped from '../interfaces/ResponseWrapped.interface';
import { classService } from '../services/class.service';

export const getClasses = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = response.locals.userId;
    const teacherId: number = response.locals.teacherId;
    const date: string = request.query.date as string;

    try {
        const classes: Class[] = await classService.getAll(userId, teacherId, new Date(date));

        const responseWrapped = {
            status: 200,
            statusText: 'OK',
            message: `Se han obtenido todas las clases`,
            data: {
                classes,
            },
        };

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error al cargar las clases',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};

export const addClass = async (request: Request, response: Response): Promise<Response> => {
    const teacherId: number = response.locals.teacherId;
    let classToAdd: Class = request.body;
    
    console.log(`class.controller > addClass: teacherId -> ${teacherId}; classToAdd -> ${classToAdd}`);

    classToAdd = await classService.addTeacherToClassAndFixDate(teacherId, classToAdd);

    console.log(`class.controller > addClass > add teacher to class: classToAdd -> ${classToAdd}`);

    try {
        const errorResponse: ResponseWrapped | null = await classService
            .isClassValid(classToAdd);

        console.log(`class.controller > addClass > isClassValid: errorResponse -> ${errorResponse}`);

        if (errorResponse) {
            return response.status(errorResponse.status).json(errorResponse);
        }

        const success: boolean = await classService.addClass(classToAdd);

        console.log(`class.controller > addClass > addClass: added successfully -> ${success}`);
        
        let responseWrapped: ResponseWrapped = {
            status: 400,
            statusText: 'Bad Request',
            message: `Ha habido un error al añadir la clase`,
            error: {
                code: 'BAD REQUEST',
                message: `Ha habido un error al añadir la clase`,
            }
        };

        if (success) {
            responseWrapped = {
                status: 204,
                statusText: 'No Content',
                message: `La clase ha sido añadida con éxito`,
            };
        }

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error al añadir la clase',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error al añadir la clase',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};

export const joinClass = async (request: Request, response: Response): Promise<Response> => {
    const classId: number = request.body.classId;
    const userId: number = response.locals.userId;

    try {
        const errorResponse: ResponseWrapped | null = await classService
            .isClassAvailable(classId);

        if (errorResponse) {
            return response.status(errorResponse.status).json(errorResponse);
        }

        const success = await classService.joinClass(userId, classId);
        let responseWrapped: ResponseWrapped;

        if (success) {
            responseWrapped = {
                status: 201,
                statusText: 'Created',
                message: `El usuario ha sido apuntado a la clase con éxito`,
            };
        }
        else {
            responseWrapped = {
                status: 400,
                statusText: 'Bad Request',
                message: `Ha habido un error al apuntarse en la clase`,
                error: {
                    code: 'BAD REQUEST',
                    message: 'Ha habido un error al apuntarse en la clase',
                }
            };
        }

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Ha habido un error al apuntarse en la clase',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Ha habido un error al apuntarse en la clase',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};

export const removeUserFromClass = async (request: Request, response: Response): Promise<Response> => {
    const classId: number = parseInt(request.params.classId);
    const userId: number = response.locals.userId;

    try {
        const success = await classService.removeUserFromClass(userId, classId);
        let responseWrapped: ResponseWrapped;

        if (success) {
            responseWrapped = {
                status: 204,
                statusText: 'No Content',
                message: `El usuario se ha desapuntado de la clase con éxito`,
            };
        }
        else {
            responseWrapped = {
                status: 400,
                statusText: 'Bad Request',
                message: `Ha habido un error al desapuntarse en la clase`,
                error: {
                    code: 'BAD REQUEST',
                    message: 'Ha habido un error al desapuntarse en la clase',
                }
            };
        }

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Ha habido un error al desapuntarse en la clase',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Ha habido un error al desapuntarse en la clase',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};

export const removeClass = async (request: Request, response: Response): Promise<Response> => {
    const classId: number = parseInt(request.params.classId);
    const teacherId: number = response.locals.teacherId;

    try {
        const success = await classService.removeClass(teacherId, classId);
        let responseWrapped: ResponseWrapped;

        if (success) {
            responseWrapped = {
                status: 204,
                statusText: 'No Content',
                message: `La clase ha sido eliminada con éxito`,
            };
        }
        else {
            responseWrapped = {
                status: 400,
                statusText: 'Bad Request',
                message: `Ha habido un error al intentar borrar la clase`,
                error: {
                    code: 'BAD REQUEST',
                    message: 'Ha habido un error al intentar borrar la clase',
                }
            };
        }

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Ha habido un error al intentar borrar la clase',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Ha habido un error al intentar borrar la clase',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};
