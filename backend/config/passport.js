import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const initPassport = () => {
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'your_google_client_id') {
    console.warn('⚠️  Google OAuth not configured - skipping Google strategy');
    return;
  }

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const avatar = profile.photos[0]?.value;

      // First check by googleId (returning OAuth user)
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      // Check if email exists (registered via email/password before)
      user = await User.findOne({ email });
      if (user) {
        // Link Google account to existing user without triggering password rehash
        await User.updateOne({ _id: user._id }, { $set: { googleId: profile.id, avatar } });
        user.googleId = profile.id;
        user.avatar = avatar;
        return done(null, user);
      }

      // Brand new user via Google
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email,
        avatar,
        password: Math.random().toString(36).slice(-12),
      });

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};

export default passport;
