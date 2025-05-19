import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

export const decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
}

export const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
  return refreshToken;
}

export const verifyRefreshToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  return decoded;
}

export const decodeRefreshToken = (refreshToken) => {
  const decoded = jwt.decode(refreshToken);
  return decoded;
}

export const generateTokenAndRefreshToken = (user) => {
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  return { token, refreshToken };
}

export const verifyTokenAndRefreshToken = (token, refreshToken) => {
  const decodedToken = verifyToken(token);
  const decodedRefreshToken = verifyRefreshToken(refreshToken);
  return { decodedToken, decodedRefreshToken };
}











