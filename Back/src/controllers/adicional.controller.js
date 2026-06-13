const pool = require('../db');

const getAdicionalesPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query('SELECT a.* FROM adicional a LEFT JOIN postulacion pos ON pos.postulacion_id = a.postulacion_id LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id WHERE u.usuario_id = $1 AND con.estado = \'ABIERTA\' AND a.postulacion_id = $2', [id, postulacion_id]);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay adicionales asociadas a este usuario.');
            return res.status(404).json('No hay adicionales asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las adicionales asociadas a este usuario.');
        next(error);
    };
};

const updateAdicional = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { adicional_puntaje, adicional_comentario } = req.body;
        const result = await pool.query('UPDATE adicional SET adicional_puntaje = $1, adicional_comentario = $2, adicional_estado = $3 WHERE adicional_id = $4 RETURNING *', [adicional_puntaje, adicional_comentario, adicional_puntaje > 0 ? true : false, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la adicional.');
            return res.status(404).json('No se pudo actualizar el estado de la adicional.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la adicional.');
        next(error);
    };
};

module.exports = {
    getAdicionalesPorUsuario,
    updateAdicional
};