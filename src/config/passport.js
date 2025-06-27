import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/userModel.js';
import { createHash, isValidPassword } from '../utils/passwordUtils.js';
import dotenv from 'dotenv';
dotenv.config();

// Local Strategy 
passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email });
      if (!user || !isValidPassword(user, password)) {
        return done(null, false, { message: 'Credenciales inválidas' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
};

passport.use('jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userModel.findById(payload.sub).select('-password');
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));
