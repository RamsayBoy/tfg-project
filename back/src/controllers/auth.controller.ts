import {Request, Response} from 'express';
import {userService} from '../services/user.service';

export const register = async (request: Request, response: Response) => {
    response.json({'register':'OK'});
};

export const login = async (request: Request, response: Response) => {
    const { email, password }: {
        email: string,
        password: string
    } = request.body;

    try {
        const user = await userService.getByEmailAndPassword(email, password);

        if (!user) {
            return response.status(401).json({'error':'Email o contraseña incorrectos.'});
        }

        return response.status(200).json(user);
    }
    catch (exception) {
        return response.status(500).json({'error':exception});
    }
};
