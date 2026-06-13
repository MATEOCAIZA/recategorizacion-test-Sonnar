const pool = require('../db');

const getArticulosPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query(
            `SELECT art.* 
             FROM articulo art 
             LEFT JOIN postulacion pos ON pos.postulacion_id = art.postulacion_id 
             LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id 
             LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id 
             WHERE u.usuario_id = $1 
             AND con.estado = 'ABIERTA' 
             AND pos.postulacion_id = $2`, 
            [id, postulacion_id]
        );
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay articulos asociados a este usuario.');
            return res.status(404).json('No hay articulos asociados a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener los articulos asociados a este usuario.');
        next(error);
    };
};

const updateArticuloEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { articulo_estado } = req.body;
        const result = await pool.query('UPDATE articulo SET articulo_estado = $1 WHERE articulo_id = $2 RETURNING *', [articulo_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado del articulo.');
            return res.status(404).json('No se pudo actualizar el estado del articulo.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado del articulo.');
        next(error);
    };
};

module.exports = {
    getArticulosPorUsuario,
    updateArticuloEstado
};