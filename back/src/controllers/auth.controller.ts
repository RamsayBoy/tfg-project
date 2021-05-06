import {Request, Response} from 'express';
import {userService} from '../services/user.service';
import User from '../types/User.type';

export const register = async (request: Request, response: Response) => {
    response.json({'register':'OK'});
};

export const login = async (request: Request, response: Response) => {
    const { email, password }: {
        email: string,
        password: string
    } = request.body;

    try {
        const user: User = await userService.getByEmailAndPassword(email, password);

        if (!user) {
            return response.status(401).json({
                status: 401,
                statusText: 'Unauthorized',
                message: 'El email o la contraseña son incorrectos',
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'El email o la contraseña son incorrectos',
                }
            });
        }

        return response.status(200).json({
            status: 200,
            statusText: 'OK',
            message: `Se ha iniciado sesión con el usuario con ID: ${user.id}`,
            data: user,
        });
    }
    catch (exception) {
        return response.status(500).json({
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error en el servidor',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        });
    }
};
