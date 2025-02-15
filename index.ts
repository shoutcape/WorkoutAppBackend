import express from 'express';
const app = express();
import workoutsRouter from './controllers/workouts'
import morgan from 'morgan';
import config from './utils/config';

// Middleware
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use("/", workoutsRouter)

// Start Server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🗿🗿🗿🗿`);
});
