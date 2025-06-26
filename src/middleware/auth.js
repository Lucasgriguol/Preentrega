import passport from 'passport';

// Middleware para proteger rutas con JWT
export const jwtAuth = passport.authenticate('jwt', { session: false });
