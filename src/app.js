import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import sessionRouter from './routes/sessionRouter.js';
import userRouter from './routes/userRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import './config/passport.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT      = process.env.PORT     || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/class-zero';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Rutas de vistas
app.use('/', viewsRouter);

// Rutas API
app.use('/api/users',    userRouter);
app.use('/api/sessions', sessionRouter);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server levantado en http://localhost:${PORT}`);
});
