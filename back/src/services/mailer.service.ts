import nodemailer from 'nodemailer';
import config from '../config';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.mailer.user,
        pass: config.mailer.pass
    }
});

transporter.verify().then(() => {
    console.log("Mailer ready for sending emails.")
});
