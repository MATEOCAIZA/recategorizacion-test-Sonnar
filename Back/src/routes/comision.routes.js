const { Router } = require('express');
const { createComision, getComision, getComisiones } = require('../controllers/comision.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/comisiones', authorization, getComisiones);

router.get('/comision/:id', authorization, getComision);

router.post('/comision', authorization, createComision);

module.exports = router;