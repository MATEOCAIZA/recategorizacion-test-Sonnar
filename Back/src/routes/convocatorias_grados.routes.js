const { Router } = require('express');
const { getConvocatoriasGrados } = require('../controllers/convocatorias_grados.controller');
const authorization = require('../middleware/authorization');

const router = new Router();

router.get('/convocatorias_grados', authorization, getConvocatoriasGrados);

module.exports = router;