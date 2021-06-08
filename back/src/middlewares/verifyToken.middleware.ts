import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import TokenInfo from '../interfaces/Payload.interface';
import { JwtToken } from '../types/Token.type';

// TODO: I think I should check the expiration. And in the next steps check
//  if the user is admin or not, etc...
export const TokenValidation = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const token: JwtToken = request.header('authorization')?.split(' ')[1];

    if (!token) return response.status(401).json({
        status: 401,
        statusText: 'Unauthorized',
        message: 'Acceso denegado',
        error: {
            code: 'UNAUTHORIZED',
            message: 'Acceso denegado',
        }
    });

    const tokenInfo: TokenInfo = jwt.verify(token, config.TOKEN_SECRET) as TokenInfo;
    
    response.locals.userId = tokenInfo.payload.id;
    response.locals.userRole = tokenInfo.payload.role;
    response.locals.teacherId = tokenInfo.payload.teacherId;
    
    // If the user is a teacher, it has not have teacherId because he is the teacher
    // Add temporary teacherId as it own id for some stuff like get the classes
    // TODO: improve this: Make an enumeration or just improve the way it is does
    if (tokenInfo.payload.role === 'admin') {
        response.locals.teacherId = tokenInfo.payload.id;
    }

    next();
};
