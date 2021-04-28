import express from 'express';

const app = express();

app.get('/', (request, response) => {
    response.json({"message":"Hello world!"});
});

app.listen(3000, 'localhost', () => {
    console.log('App listening at http://localhost:3000');
});
