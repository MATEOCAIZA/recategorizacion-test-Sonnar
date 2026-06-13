const { Router } = require('express');
const { getCategoriasPa, getCategoriaPa, createCategoriaPa, deleteCategoriaPa, updateCategoriaPa } = require('../controllers/categoria_pa.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/categorias_pa', authorization, getCategoriasPa);

router.get('/categoria_pa/:id', authorization, getCategoriaPa);

router.post('/categoria_pa', authorization, createCategoriaPa);

router.delete('/categoria_pa/:id', authorization, deleteCategoriaPa);

router.put('/categoria_pa/:id', authorization, updateCategoriaPa);

module.exports = router;