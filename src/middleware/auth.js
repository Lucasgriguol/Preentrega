import passport from 'passport';

// Middleware para proteger rutas
export const jwtAuth = passport.authenticate('jwt', { session: false });
