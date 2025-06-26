import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { createHash, isValidPassword } from '../utils/passwordUtils.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '1h';

// Registro
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.status(400).render('error', { message: 'El usuario ya existe' });

        const hashedPassword = createHash(password);
        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart: null,
            role: 'user'
        });

        res.redirect('/login'); // Redirigimos al login después de registrarse
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user || !isValidPassword(password, user.password)) {
            return res.status(401).render('error', { message: 'Credenciales inválidas' });
        }

        const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'coderSecretJWT', {
            expiresIn: '1h'
        });

        // Guardar token en cookie
        res.cookie('token', token, { httpOnly: true }).redirect('/');
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
});


// Current (validar JWT)
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send({ status: 'success', payload: req.user });
    }
);

export default router;
