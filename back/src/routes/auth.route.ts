import express from 'express';

const router = express.Router();

router.post('login', (request, response) => {
    const [email, password]: string[] = request.body;

    // TODO: Implement it
});
