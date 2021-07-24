import config from './config';
import express, {Express} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import classesRoutes from './routes/class.route';
import usersRoutes from './routes/user.route';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use(`${config.api.BASE_URL}/auth`, authRoutes);
app.use(`${config.api.BASE_URL}/users`, usersRoutes);
app.use(`${config.api.BASE_URL}/classes`, classesRoutes);

app.listen(config.api.PORT, config.api.HOST, (): void => {
    console.log(`App listening at http://${config.api.HOST}:${config.api.PORT}${config.api.BASE_URL}`);
});
