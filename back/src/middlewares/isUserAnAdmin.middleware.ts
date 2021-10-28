import {Request, Response, NextFunction} from 'express';
import { userService } from '../services/user.service';

export const AdminChecker = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const userId: number = response.locals.userId;
    
    const isAdmin: boolean = await userService.isAdmin(userId);

    if (isAdmin) {
        next();
    }
    else {
        return response.status(404).json({
            status: 404,
            statusText: 'Not found',
            message: 'No se encontró el recurso solicitado',
            error: {
                code: 'NOT FOUND',
                message: 'No se encontró el recurso solicitado',
            }
        });
    }
};
