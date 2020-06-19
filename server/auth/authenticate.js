const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
            if (error) {
                res.status(500).json({ 
                    message: 'You do not have permission to perform this action.' 
                })
            } else {
                req.decodedJwt = decodedToken
                next();
            }
        })
    } else {
        res.status(500).json({ message: 'Invalid authorization' });
    }
  }
  catch  {
      res.status(500).json({ message: 'You must be logged in.' });
  }
};
