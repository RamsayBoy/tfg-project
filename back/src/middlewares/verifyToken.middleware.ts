import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JwtToken } from '../types/Token.type';

interface Payload {
    id: number;
    iat: number;
    exp: number;
}

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
    //request.userId = payload.id;

    next();
};
