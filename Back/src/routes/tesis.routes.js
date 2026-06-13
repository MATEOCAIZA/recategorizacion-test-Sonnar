const { Router } = require('express');
const { getTesisPorUsuario, updateTesisEstado } = require('../controllers/tesis.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/tesis/:id/:postulacion_id', authorization, getTesisPorUsuario);

router.put('/tesis/:id', authorization, updateTesisEstado);

module.exports = router;