import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import Turnos from './routes/turnos.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


const cors = require('cors');


const allowedOrigins = ['https://merry-souffle-f4fa04.netlify.app'];

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(morgan('dev'));
app.use(express.json());


app.use('/turnos', Turnos);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

export default app;
