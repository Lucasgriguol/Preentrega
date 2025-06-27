import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const SECRET = process.env.JWT_SECRET || 'coderSecretJWT';

// Middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
}

// Home
router.get('/', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render('home', { title: 'Página Home', user: null });
  }
  try {
    const user = jwt.verify(token, SECRET);
    return res.render('home', { title: 'Página Home', user });
  } catch (err) {
    res.clearCookie('token');
    return res.render('home', { title: 'Página Home', user: null });
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

// Register
router.get('/register', (req, res) => {
  res.render('register', { title: 'Registro de Usuario' });
});

// Profile
router.get('/profile', authMiddleware, (req, res) => {
  res.render('profile', { title: 'Perfil de Usuario', user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

// Error
router.get('/error', (req, res) => {
  res.render('error', { title: 'Error', message: 'Algo salió mal.' });
});

export default router;
