const { Router } = require('express');
const { getPonenciasPorUsuario, updatePonenciaEstado } = require('../controllers/ponencia.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/ponencias/:id/:postulacion_id', authorization, getPonenciasPorUsuario);

router.put('/ponencia/:id', authorization, updatePonenciaEstado);

module.exports = router;