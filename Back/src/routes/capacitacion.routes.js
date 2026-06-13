const { Router } = require('express');
const { getCapacitacionesPorUsuario, updateCapacitacionEstado } = require('../controllers/capacitacion.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/capacitaciones/:id/:postulacion_id', authorization, getCapacitacionesPorUsuario);

router.put('/capacitacion/:id', authorization, updateCapacitacionEstado);

module.exports = router;