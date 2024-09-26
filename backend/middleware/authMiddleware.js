const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]; // Extract the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = await User.findById(decoded.userId).select('-password'); // Get user info without the password
        next();
      } catch (err) {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'No token, authorization denied' });
    }
  };
