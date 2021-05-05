import dotenv from 'dotenv';

dotenv.config();

const config = {
    api: {
        BASE_URL : '/api/v0',
        PORT     : Number(process.env.PORT),
        HOST     : process.env.HOST || 'localhost',
    },
    database: {
        USER     : process.env.DB_USER,
        PASSWORD : process.env.DB_PASS,
        NAME     : process.env.DB_NAME,
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET,
}

export default config;
