const { Router } = require('express');
const { getArticulosPorUsuario, updateArticuloEstado } = require('../controllers/articulo.controller')
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/articulos/:id/:postulacion_id', authorization, getArticulosPorUsuario);

router.put('/articulo/:id', authorization, updateArticuloEstado);

module.exports = router;