import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const getMe = async (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar } });
};

const ALLOWED_FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const googleCallback = (req, res) => {
  const token = generateToken(req.user._id);
  const user = { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar };
  // Use allowlisted frontend URL — never use user-supplied redirect targets
  const redirectUrl = new URL('/auth/callback', ALLOWED_FRONTEND_URL);
  redirectUrl.searchParams.set('token', token);
  redirectUrl.searchParams.set('user', JSON.stringify(user));
  res.redirect(redirectUrl.toString());
};
