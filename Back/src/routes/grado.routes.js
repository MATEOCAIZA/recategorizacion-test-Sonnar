const { Router } = require('express');

const authorization = require('../middleware/authorization');
const { getGrados, getGrado, createGrado, deleteGrado, updateGrado } = require('../controllers/grado.controller');

const router = Router();

router.get('/grados', authorization, getGrados);

router.get('/grado/:id', authorization, getGrado);

router.post('/grado', authorization, createGrado);

router.delete('/grado/:id', authorization, deleteGrado);

router.put('/grado/:id', authorization, updateGrado);

module.exports = router;