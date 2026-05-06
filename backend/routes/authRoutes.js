import express from 'express';
import passport from '../config/passport.js';
import { signup, login, getMe, googleCallback } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

// Google OAuth - use inline middleware so passport strategy is resolved at request time, not import time
router.get('/google', (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login?error=oauth_failed',
    session: false
  })(req, res, next);
}, googleCallback);

export default router;
