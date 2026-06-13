const { Router } = require('express');
const { getUsers, getUser, createUser, deleteUser, updateUser, getUsersWithCC, getElegibleUsersBosses, getUserName, getUsersAndRoles, getUserCategories, getComisionUsers } = require('../controllers/usuario.controller');
const authorization = require('../middleware/authorization');

const router = Router();

router.get('/users', authorization, getUsers);

router.get('/user/:id', authorization, getUser);

router.get('/user-name/:id', authorization, getUserName);

router.get('/users-roles', authorization, getUsersAndRoles);

router.get('/user-category/:id', authorization, getUserCategories);

router.get('/comision-users', authorization, getComisionUsers);

router.post('/user', authorization, createUser);

router.delete('/user/:id', authorization, deleteUser);

router.put('/user/:id', authorization, updateUser);

module.exports = router;