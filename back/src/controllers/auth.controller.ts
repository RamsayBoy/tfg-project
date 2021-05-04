import {Request, Response} from 'express';

export const register = (request: Request, response: Response) => {
    response.json({'register':'OK'});
};

export const login = (request: Request, response: Response) => {
    const [email, password]: string[] = request.body;

    try {
        // TODO
    }
    catch (exception) {
        response.json({'error':exception});
    }
};
