import {Request, Response} from 'express';
import Class from "../interfaces/Class.interface";
import ResponseWrapped from '../interfaces/ResponseWrapped.interface';
import { classService } from '../services/class.service';

export const getClasses = async (request: Request, response: Response): Promise<Response> => {
    const teacherId: number = response.locals.teacherId;
    
    try {
        const classes: Class[] = await classService.getAllByTeacherId(teacherId);

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
            message: 'Se ha producido un error en el servidor',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};
