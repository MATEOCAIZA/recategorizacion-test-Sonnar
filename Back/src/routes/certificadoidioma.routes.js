const { Router } = require('express');
const { getCertificadosIdiomaPorUsuario, updateCertificadoIdiomaEstado } = require('../controllers/certificadoidioma.controller');
const authorization = require('../middleware/authorization');

const router = new Router();

router.get('/certificadosidioma/:id/:postulacion_id', authorization, getCertificadosIdiomaPorUsuario);

router.put('/certificadoidioma/:id', authorization, updateCertificadoIdiomaEstado);

module.exports = router;