const pool = require('../db');

const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM usuario');
        if (result.rowCount === 0) {
            return res.status(404).json('No hay usuarios.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener los usuarios.');
        next(error);
    };
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM usuario WHERE usuario_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json('Usuario no encontrado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Hubo un error al intentar obtener el usuario.');
        next(error);
    };
};

const getUserName = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT usuario_primernombre, usuario_segundonombre, usuario_primerapellido, usuario_segundoapellido FROM usuario WHERE usuario_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json('Usuario no encontrado.');
        };
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error al intentar obtener el usuario.');
        next(error);
    };
};

const getUsersAndRoles = async (req, res, next) => {
    try {
        const result = await pool.query('select * from usuario u left join rol_usuario ru on u.usuario_id = ru.usuario_id left join rol r on ru.rol_id = r.rol_id');
        if (result.rowCount === 0) {
            return res.status(404).json('No hay usuarios.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener los usuarios.');
        next(error);
    };
};

const getUserCategories = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('select * from usuario u left join grado_usuario gu on u.usuario_id = gu.usuario_id left join grado gr on gu.grado_id = gr.grado_id left join nivel n on n.nivel_id = gr.nivel_id left join categoria_pa ca on ca.categoriapa_id = n.categoriapa_id where u.usuario_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json('No hay categorías de usuarios.');
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las categorías de usuarios.');
        next(error);
    }
};

const getComisionUsers = async (req, res, next) => {
    try {
        const result = await pool.query('select * from usuario u left join comision com on u.comision_id = com.comision_id left join convocatoria con on con.convocatoria_id = com.convocatoria_id where con.estado = \'ABIERTA\'');
        if (result.rowCount === 0) {
            return res.status(404).json('No hay usuarios en comisiones.');
        };

        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar obtener los usuarios en comisiones.');
        next
    }
}

const createUser = async (req, res, next) => {
    try {
        const { boss_id, costcenter_id, role_id, user_email, user_password } = req.body;
        const resultMaxId = await pool.query('SELECT COALESCE(MAX(user_id), 0) + 1 AS new_user_id FROM users');
        const newUserId = resultMaxId.rows[0].new_user_id;
        const result = await pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING *', [newUserId, boss_id, costcenter_id, role_id, user_email, user_password]);
        if (result.rowCount === 0) {
            return res.status(400).json('No se pudo crear el usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Hubo un error al intentar crear el usuario.');
        next(error);
    };
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).json('No se pudo eliminar el usuario, puede que no exista.');
        };
        res.json('Usuario eliminado correctamente.');
    } catch (error) {
        res.status(500).json('Hubo un error al intentar eliminar el usuario.');
        next(error);
    };
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userboss_id, costcenter_id, role_id, user_email } = req.body;

        const result = await pool.query(
            'UPDATE users SET userboss_id = $1, costcenter_id = $2, role_id = $3, user_email = $4 WHERE user_id = $5 RETURNING *',
            [userboss_id, costcenter_id, role_id, user_email, id]
        );

        if (result.rowCount === 0) {
            return res.status(400).json('No se pudo actualizar el usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Hubo un error al intentar actualizar el usuario.');
        next(error);
    };
};

module.exports = {
    getUsers,
    getUser,
    getUserName,
    getUserCategories,
    getUsersAndRoles,
    getComisionUsers,
    createUser,
    deleteUser,
    updateUser
};