const { Router } = require('express');
const { getAdicionalesPorUsuario, updateAdicional } = require('../controllers/adicional.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/adicionales/:id/:postulacion_id', authorization, getAdicionalesPorUsuario);

router.put('/adicional/:id', authorization, updateAdicional);

module.exports = router;