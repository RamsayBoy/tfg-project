import config from './config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.route';

// TODO: Add port, host, and api base url as environment variables
const app = express();

// Middleware
app.use(express.json());
app.use(helmet);
app.use(cors());

// Routes
app.get(`${config.api.BASE_URL}/auth`, authRoutes);

app.listen(config.api.PORT, config.api.HOST, () => {
    console.log(`App listening at http://${config.api.HOST}:${config.api.PORT}/${config.api.BASE_URL}`);
});
