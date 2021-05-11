import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import Payload from '../interfaces/Payload.interface';
import { JwtToken } from '../types/Token.type';

export const TokenValidation = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const token: JwtToken = request.header('auth-token');

    if (!token) return response.status(401).json({
        status: 401,
        statusText: 'Unauthorized',
        message: 'Acceso denegado',
        error: {
            code: 'UNAUTHORIZED',
            message: 'Acceso denegado',
        }
    });

    const payload = jwt.verify(token, config.TOKEN_SECRET) as Payload;
    response.locals.userId = payload.id;
    response.locals.userRole = payload.role;

    next();
};
