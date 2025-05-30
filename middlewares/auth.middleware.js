import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export const authorize = async (req, res, next) => {
  const { token } = req.authorize;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
}
