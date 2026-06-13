const { Router } = require('express');
const { getRoles, getRole, getRolesPorUsuario, createRole, deleteRole, updateRole } = require('../controllers/rol.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/roles', authorization, getRoles);

router.get('/role/:id', authorization, getRole);

router.get('/roles/:id', authorization, getRolesPorUsuario);

router.post('/role', authorization, createRole);

router.put('/role/:id', authorization, updateRole);

router.delete('/role/:id', authorization, deleteRole);

module.exports = router;