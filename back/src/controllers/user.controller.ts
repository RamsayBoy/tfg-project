import {Request, Response} from 'express';
import ResponseWrapped from '../interfaces/ResponseWrapped.interface';
import User from '../interfaces/User.interface';
import {userService} from '../services/user.service';

export const getUser = async (request: Request, response: Response): Promise<Response> => {
    const userId: number = response.locals.userId;

    try {
        const user: User = await userService.getById(userId);

        const responseWrapped = {
            status: 200,
            statusText: 'OK',
            message: `Se ha obtenido la información del usuario`,
            data: {
                user,
            },
        };

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error al cargar el nombre del usuario',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};
