import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import Turnos from './routes/turnos.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Mongo connected");
});

const allowedOrigins = [
  'https://merry-souffle-f4fa04.netlify.app',
  'http://localhost:5173' 
];



app.use(express.json());
app.use(morgan('dev'));


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use('/turnos', Turnos);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;