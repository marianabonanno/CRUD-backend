import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import Turnos from './routes/turnos.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());


app.use(authRoutes);

app.use(Turnos);

export default app;