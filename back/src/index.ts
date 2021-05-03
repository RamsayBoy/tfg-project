import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth.route';

// TODO: Add port, host, and api base url as environment variables
const app = express();

// Middleware
app.use(helmet);

// Routes
app.get('api/v0/auth', authRoutes);

app.listen(3000, 'localhost', () => {
    console.log('App listening at http://localhost:3000');
});
