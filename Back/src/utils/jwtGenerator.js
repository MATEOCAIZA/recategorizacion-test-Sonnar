const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id, role_id, costcenter_id, user_email) {
    const payload = {
        user: user_id,
        type: role_id,
        centrocostos: costcenter_id,
        email: user_email
    };

    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24hr" })
}

module.exports = jwtGenerator;