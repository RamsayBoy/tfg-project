import express from 'express';

const router = express.Router();

router.post('register', (request, response) => {
    // TODO: Implement it 
});

router.post('login', (request, response) => {
    const [email, password]: string[] = request.body;

    // TODO: Implement it

});

export default router;
