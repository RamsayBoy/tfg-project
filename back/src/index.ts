import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Add port, host, and api base url as environment variables
const app = express();

// Middleware
app.use(express.json());
app.use(helmet);
app.use(cors());

// Routes
app.get('api/v0/auth', authRoutes);

app.listen(3000, 'localhost', () => {
    console.log('App listening at http://localhost:3000');
});
