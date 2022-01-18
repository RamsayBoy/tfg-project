import config from "../config";
import { JwtToken } from "../types/Token.type";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";
import passGenerator from 'generate-password';
import bcrypt from 'bcrypt';
import { transporter } from "./mailer.service";

// TODO: Dependency injection
export default class AuthService {
    async generateToken(payload: { id: number,  role?: string }, expirateInTime: number): Promise<JwtToken> {
        const token: JwtToken = jwt.sign({ payload }, config.TOKEN_SECRET, {
            expiresIn: expirateInTime,
        });
        return token;
    }
    
    async isAlreadyRegistered(email: string): Promise<boolean> {
        return await userRepository.isAlreadyRegistered(email);
    }
    
    async register(name: string, lastName: string, email: string, teacherId: number): Promise<void> {
        // Generate random password
        let password: string = passGenerator.generate({length: 10, numbers: true});

        // Send email
        // TODO: Change href url depending on environment
        // TODO: Use the teacher email instead of noreply.tfg@tfg.es
        // NOTE: Gmail mails revert the <noreply.tfg@tfg.es> to the original one
        await transporter.sendMail({
            from: `"TFG App" <noreply.tfg@tfg.es>`,
            to: config.mailer.devEmail ?? email,
            subject: "¡Ha sido registrado!",
            html: `
                <p>Hola, ${email}:</p>
                <p>Ha sido registrado con éxito en la aplicación.</p>
                <p>Su contraseña provisional es: <b>${password}</b>.</p>
                <p>¡Diríjase a la <a href="http://localhost:4200/">aplicación</a> para cambiarla!.</p>
            `,
          });
        
        // Hash the password
        password = await bcrypt.hash(password, 10);

        await userRepository.register(name, lastName, email, password, teacherId);
    }
}

// TODO: Remove when dependency injection
const authService = new AuthService();
export { authService };
