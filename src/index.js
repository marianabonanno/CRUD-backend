import dotenv from 'dotenv'; 
dotenv.config();

import app from './app.js'
import {connectDB} from './db.js'

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
console.log('Server on port', PORT)