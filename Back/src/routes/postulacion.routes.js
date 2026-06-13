const { Router } = require('express');
const { createPostulacion, upload, getPostulaciones, getPostulacion, updatePostulacion, getPostulacionesAuxiliar1, getPostulacionesAuxiliar2, getPostulacionesAgregado1, getPostulacionesAgregado2, getPostulacionesPrincipal1, getPostulacionesPrincipal2, updateUsuarioDesignado } = require('../controllers/postulacion.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/postulaciones', authorization, getPostulaciones);

router.get('/postulaciones/:id', authorization, getPostulacion);

router.get('/postulaciones-auxiliar1', authorization, getPostulacionesAuxiliar1);

router.get('/postulaciones-auxiliar2', authorization, getPostulacionesAuxiliar2);

router.get('/postulaciones-agregado1', authorization, getPostulacionesAgregado1);

router.get('/postulaciones-agregado2', authorization, getPostulacionesAgregado2);

router.get('/postulaciones-principal1', authorization, getPostulacionesPrincipal1);

router.get('/postulaciones-principal2', authorization, getPostulacionesPrincipal2);

router.post('/postulacion', authorization, upload.any(), createPostulacion);

router.put('/postulacion/:id', authorization, updatePostulacion);

router.put('/designar-postulacion/:id', authorization, updateUsuarioDesignado);

module.exports = router;