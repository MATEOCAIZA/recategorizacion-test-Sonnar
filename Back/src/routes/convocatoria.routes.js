const { Router } = require('express');
const { getConvocatorias, getConvocatoria, createConvocatoria, deleteConvocatoria, updateConvocatoria, getConvocatoriaAbierta } = require('../controllers/convocatoria.controller');
const aurhorization = require('../middleware/authorization');
const { upload } = require('../controllers/convocatoria.controller');

const router = Router();

router.get('/convocatorias', aurhorization, getConvocatorias);

router.get('/convocatoria/:id', aurhorization, getConvocatoria);

router.get('/convocatoria-abierta', aurhorization, getConvocatoriaAbierta);

router.post('/convocatoria', aurhorization, upload.single('convocatoriaArchivo'), createConvocatoria);

router.delete('/convocatoria/:id', aurhorization, deleteConvocatoria);

router.put('/convocatoria/:id', aurhorization, updateConvocatoria);

module.exports = router;
