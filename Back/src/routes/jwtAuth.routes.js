const { Router } = require('express');
const { createUser, loginUser, verifyUser, changePassword, resetPassword } = require('../controllers/jwtAuth.controller');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

const router = Router();

router.post('/register', authorization, createUser);

router.post('/login', validInfo, loginUser)

router.get('/is-verify', authorization, verifyUser)

router.put('/change-password/:id', authorization, changePassword);

router.put('/reset-password/:id', authorization, resetPassword);

module.exports = router;