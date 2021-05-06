import {Request, Response} from 'express';
import {userService} from '../services/user.service';
import { JwtToken } from '../types/Token.type';
import User from '../types/User.type';

export const test = async (request: Request, response: Response): Promise<Response> => {
    return response.json({'test':'You have access!'});
};

export const register = async (request: Request, response: Response): Promise<Response> => {
    return response.json({'register':'OK'});
};

export const login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password }: {
        email: string,
        password: string
    } = request.body;

    try {
        const {user, token}: {
            user: User,
            token: JwtToken
        } = await userService.getByEmailAndPassword(email, password);

        if (!token) {
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

        return response.status(200).header('auth-token', token).json({
            status: 200,
            statusText: 'OK',
            message: `Usuario con ID ${user.id} ha iniciado sesión de manera exitosa`,
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
