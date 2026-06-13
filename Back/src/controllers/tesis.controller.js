const pool = require('../db');

const getTesisPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query('SELECT t.* FROM tesisdirigida t LEFT JOIN postulacion pos ON pos.postulacion_id = t.postulacion_id LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id WHERE u.usuario_id = $1 AND con.estado = \'ABIERTA\' AND t.postulacion_id = $2', [id, postulacion_id]);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay tesis asociadas a este usuario.');
            return res.status(404).json('No hay tesis asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las tesis asociadas a este usuario.');
        next(error);
    };
};

const updateTesisEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tesis_estado } = req.body;
        const result = await pool.query('UPDATE tesisdirigida SET tesis_estado = $1 WHERE tesis_id = $2 RETURNING *', [tesis_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la tesis.');
            return res.status(404).json('No se pudo actualizar el estado de la tesis.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la tesis.');
        next(error);
    };
};

module.exports = {
    getTesisPorUsuario,
    updateTesisEstado
};