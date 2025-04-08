import express from 'express';
import 'express-async-errors'
import workoutRouter from './controllers/workouts'
import morgan from 'morgan';
import config from './utils/config';
import cors from 'cors'
import userRouter from './controllers/users';
import { sequelize } from './utils/db';
import logger from './utils/logger'
import middleware from './utils/middleware';
import loginRouter from './controllers/login';


const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

//Routes
app.use("/api", workoutRouter)
app.use("/api", userRouter)
app.use("/api", loginRouter)

//errorHandler
app.use(middleware.errorHandler as express.ErrorRequestHandler)

// Public routes
app.get('/api/public', (_req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected routes
app.get('/api/private', middleware.checkJwt, (_req, res) => {
  res.json({ message: 'This is a private endpoint' });
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err: Error) => console.error('Database connection error:', err));

// Start Server
const PORT = config.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT} 🗿🗿🗿🗿`);
  });
}


export default app
