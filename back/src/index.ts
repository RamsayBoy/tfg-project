import express from 'express';
import helmet from 'helmet';
import authRoutes from './routes/auth.route';

const app = express();

// Middleware
app.use(helmet);

// Routes
app.get('api/v0/auth', authRoutes);

app.listen(3000, 'localhost', () => {
    console.log('App listening at http://localhost:3000');
});
