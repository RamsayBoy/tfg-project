import nodemailer from 'nodemailer';
import config from '../config';

export const transporter = nodemailer.createTransport({
    host: config.mailer.host,
    port: config.mailer.port,
    secure: config.mailer.secure,
    auth: {
        user: config.mailer.user,
        pass: config.mailer.pass
    }
});

transporter.verify().then(() => {
    console.log("Mailer ready for sending emails.")
});
