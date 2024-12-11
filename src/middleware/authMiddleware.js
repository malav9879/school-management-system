const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and user role
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with your actual secret key
        req.user = decoded; // Attach decoded user information to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token verification failed' });
    }
};

// Middleware to restrict access based on roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { protect, authorize };
