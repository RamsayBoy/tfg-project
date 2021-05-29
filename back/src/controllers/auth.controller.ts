import {Request, Response} from 'express';
import {userService} from '../services/user.service';
import { JwtToken } from '../types/Token.type';
import User from '../interfaces/User.interface';
import { authService } from '../services/auth.service';
import ResponseWrapped from '../interfaces/ResponseWrapped.interface';

export const register = async (request: Request, response: Response): Promise<Response> => {
    return response.json({'register':'OK'});
};

export const login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password }: User = request.body;

    try {
        const user: User | null = await userService.getByEmailAndPassword(email, password);

        if (!user) {
            const responseWrapped: ResponseWrapped = {
                status: 401,
                statusText: 'Unauthorized',
                message: 'El email o la contraseña son incorrectos',
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'El email o la contraseña son incorrectos',
                }
            };

            return response.status(401).json(responseWrapped);
        }

        const token: JwtToken = await authService.generateToken(user, 60 * 60 * 24);  // Expires in a day

        const responseWrapped = {
            status: 200,
            statusText: 'OK',
            message: `Usuario con ID ${user.id} ha iniciado sesión de manera exitosa`,
            data: {
                user,
                token,
            },
        };

        return response.status(200).header('auth-token', token).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error al iniciar sesión',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};
