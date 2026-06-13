const { Router } = require('express');
const { getNiveles, getNivel, createNivel, deleteNivel, updateNivel } = require('../controllers/nivel.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/niveles', authorization, getNiveles);

router.get('/nivel/:id', authorization, getNivel);

router.post('/nivel', authorization, createNivel);

router.delete('/nivel/:id', authorization, deleteNivel);

router.put('/nivel/:id', authorization, updateNivel);

module.exports = router;