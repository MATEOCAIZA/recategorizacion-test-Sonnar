const { Router } = require('express');
const { getEvaluacionesPorUsuario, updateEvaluacionEstado } = require('../controllers/evaldocente.controller');
const authorization = require('../middleware/authorization');

const router = new Router();

router.get('/evaluaciones/:id/:postulacion_id', authorization, getEvaluacionesPorUsuario);

router.put('/evaluacion/:id', authorization, updateEvaluacionEstado);

module.exports = router;