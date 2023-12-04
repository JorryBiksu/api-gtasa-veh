// authentication.js

import jwt from 'jsonwebtoken';

const secretKey = 'shHsk39543ASn'; // Replace with a strong, secret key

// Generate a JWT token
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

// Verify a JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    // Handle token verification failure
    console.error('Token verification failed:', error.message);
    return null;
  }
};
