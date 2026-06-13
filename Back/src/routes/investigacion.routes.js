const { Router } = require('express');
const { getInvestigacionesPorUsuario, handleUpdateInvestigacionEstado } = require('../controllers/investigacion.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/investigaciones/:id/:postulacion_id', authorization, getInvestigacionesPorUsuario);

router.put('/investigacion/:id', authorization, handleUpdateInvestigacionEstado);

module.exports = router;