import {Request, Response} from 'express';
import {userService} from '../services/user.service';
import { JwtToken } from '../types/Token.type';
import User from '../interfaces/User.interface';
import { authService } from '../services/auth.service';
import ResponseWrapped from '../interfaces/ResponseWrapped.interface';
import bcrypt from 'bcrypt';
import { CustomError } from '../errors/CustomError';

export const register = async (request: Request, response: Response): Promise<Response> => {
    const name: string = request.body.name;
    const lastName: string = request.body.lastName;
    const email: string = request.body.email;
    const teacherId: number = response.locals.teacherId;

    try {
        const alreadyExists: boolean = await authService.isAlreadyRegistered(email);

        if (alreadyExists) {
            const responseWrapped: ResponseWrapped = {
                status: 403,
                statusText: 'Already exists',
                message: `El usuario con email "${email}" ya está registrado`,
                error: {
                    code: 'ALREADY EXISTS',
                    message: `El usuario con email "${email}" ya está registrado`,
                }
            };

            return response.status(403).json(responseWrapped);
        }

        if (!email) {
            const responseWrapped: ResponseWrapped = {
                status: 403,
                statusText: 'Already exists',
                message: `El email introducido no es válido.`,
                error: {
                    code: 'ALREADY EXISTS',
                    message: `El email introducido no es válido.`,
                }
            };

            return response.status(403).json(responseWrapped);
        }

        await authService.register(name, lastName, email, teacherId);

        const responseWrapped = {
            status: 200,
            statusText: 'OK',
            message: `El usuario ha sido registrado`,
        };

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: 'Se ha producido un error al registrar el usuario',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};

export const login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password }: User = request.body;

    try {
        const user: User | null = await userService.getByEmail(email);
        
        if (!user) {
            const responseWrapped: ResponseWrapped = {
                status: 401,
                statusText: 'Unauthorized',
                message: `No existe el usuario con email ${email}`,
                error: {
                    code: 'UNAUTHORIZED',
                    message: `No existe el usuario con email ${email}`,
                }
            };
            
            return response.status(401).json(responseWrapped);
        }
        
        // Validate password
        user.password = await userService.getPasswordById(user.id);
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            const responseWrapped: ResponseWrapped = {
                status: 401,
                statusText: 'Unauthorized',
                message: `La contraseña introducida no es correcta.`,
                error: {
                    code: 'UNAUTHORIZED',
                    message: `La contraseña introducida no es correcta.`,
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


export const changeUserPassword = async (request: Request, response: Response): Promise<Response> => {
    const password: string = request.body.password;
    const newPassword: string = request.body.newPassword;
    const userId: number = response.locals.userId;
    
    try {
        if (!newPassword) {
            throw new CustomError("Las contraseña introducida no es una contraseña válida.");
        }

        const databasePassword: string = await userService.getPasswordById(userId);
        const areEqual = await bcrypt.compare(password, databasePassword);

        if (!areEqual) {
            throw new CustomError("La contraseña actual es incorrecta.");
        }

        const success: boolean = await userService.updatePassword(userId, newPassword);

        if (!success) {
            throw new CustomError("Debido a un error no se ha podido actualizar la contraseña.");
        }

        const responseWrapped: ResponseWrapped = {
            status: 200,
            statusText: 'OK',
            message: `La contraseña se ha actualizado con éxito`,
        };

        return response.status(200).json(responseWrapped);
    }
    catch (exception) {
        const responseWrapped: ResponseWrapped = {
            status: 500,
            statusText: 'Internal error',
            message: exception instanceof(CustomError) ?
                exception.message
                :
                'Se ha producido un error.',
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Se ha producido un error en el servidor',
            }
        }

        return response.status(500).json(responseWrapped);
    }
};
