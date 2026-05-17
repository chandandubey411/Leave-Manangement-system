const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });

  // Set JWT as HTTP-Only cookie (Secure in prod)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: (parseInt(process.env.COOKIE_EXPIRES_IN) || 30) * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;
