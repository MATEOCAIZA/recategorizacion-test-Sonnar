const pool = require('../db');

const getRoles = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM rol');
        if (result.rowCount === 0) {
            return res.status(404).send('No hay roles.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener los roles.');
        next(error);
    };
};

const getRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM role WHERE role_id = $1', [id]);
        if(result.rowCount === 0) {
            return res.status(404).send('Rol no encontrado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener el rol.');
        next(error);
    };
};

const getRolesPorUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT r.* FROM rol r LEFT JOIN rol_usuario ur ON r.rol_id = ur.rol_id WHERE ur.usuario_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('No hay roles asociados a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al intentar obtener los roles asociados a este usuario.');
        next(error);
    };
};

const createRole = async (req, res, next) => {
    try {
        const { rol_nombre } = req.body;
        const resultMaxId = await pool.query('SELECT COALESCE(MAX(rol_id), 0) + 1 AS new_rol_id FROM rol');
        const newRoleId = resultMaxId.rows[0].new_rol_id;
        const result = await pool.query('INSERT INTO rol VALUES ($1, $2) RETURNING *', [newRoleId, rol_nombre]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo crear el rol.');
        };
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al intentar crear el rol.');
        next(error);
    };
};

const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM role WHERE role_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo eliminar el rol, puede que no exista.');
        };
        res.send('Rol eliminado correctamente.');
    } catch (error) {
        res.status(500).send('Hubo un error al intentar eliminar el rol.');
        next(error);
    };
};

const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role_name } = req.body;
        const result = await pool.query('UPDATE role SET role_name = $1 WHERE role_id = $2 RETURNING *', [role_name, id]);
        if (result.rowCount === 0) {
            return res.status(404).send('No se pudo actualizar el rol, puede que no exista.');
        };
    } catch (error) {
        res.status(500).send('Hubo un error al intentar actualizar el rol.');
        next(error);
    };
};

module.exports = {
    getRoles,
    getRole,
    getRolesPorUsuario,
    createRole,
    deleteRole,
    updateRole
};