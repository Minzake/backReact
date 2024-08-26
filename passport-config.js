// passport-config.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import db from './models/index.js';
const User = db.User;

dotenv.config(); // Si usas un archivo .env para las variables de entorno

const jwtSecret = process.env.JWT_SECRET || 'tu_secreto_jwt'; // Usa una clave secreta segura

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findByPk(jwt_payload.id); // Ajusta según tu modelo
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
