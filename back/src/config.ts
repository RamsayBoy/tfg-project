import dotenv from 'dotenv';

dotenv.config();

const config = {
    api: {
        BASE_URL                : '/api/v0',
        PORT                    : Number(process.env.PORT),
        HOST                    : process.env.HOST || 'localhost',
    },
    database: {
        USER                    : process.env.DB_USER,
        PASSWORD                : process.env.DB_PASS,
        NAME                    : process.env.DB_NAME,
    },
    TOKEN_SECRET                : process.env.TOKEN_SECRET || 'devToken',
    DEFAULT_PROFILE_IMAGE_PATH  : process.env.DEFAULT_PROFILE_IMAGE_PATH || '',
    mailer: {
        host                    : process.env.NODEMAILER_HOST,
        port                    : Number(process.env.NODEMAILER_PORT),
        secure                  : Boolean(process.env.NODEMAILER_SECURE),
        user                    : process.env.NODEMAILER_USER,
        pass                    : process.env.NODEMAILER_PASS,
        devEmail                : process.env.DEV_EMAIL
    },
    clientApp: {
        baseUrl                 : process.env.CLIENT_BASE_URL
    }
}

export default config;
