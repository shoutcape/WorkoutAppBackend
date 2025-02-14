import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Sample Route
app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ message: 'Server is running!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} 🗿🗿🗿🗿`);
});
