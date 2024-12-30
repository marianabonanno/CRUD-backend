import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import Turnos from './routes/turnos.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


const allowedOrigins = ['https://merry-souffle-f4fa04.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', allowedOrigins[0]);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});


app.use('/turno', Turnos);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

export default app;
