const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).json('No tienes los permisos necesarios para acceder a este recurso');
        };

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;
        next();
    } catch (error) {
        if (!res.headersSent) { 
            return res.status(403).json('No tienes los permisos necesarios para acceder a este recurso.');
        };
        next(error);
    };
};