import express from 'express';
const app = express();
import workoutsRouter from './controllers/workouts'
import morgan from 'morgan';

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use("/", workoutsRouter)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🗿🗿🗿🗿`);
});
