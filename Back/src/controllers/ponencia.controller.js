const pool = require('../db');

const getPonenciasPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query('SELECT p.* FROM ponencia p LEFT JOIN postulacion pos ON pos.postulacion_id = p.postulacion_id LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id WHERE u.usuario_id = $1 AND con.estado = \'ABIERTA\' AND p.postulacion_id = $2', [id, postulacion_id]);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay ponencias asociadas a este usuario.');
            return res.status(404).json('No hay ponencias asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las ponencias asociadas a este usuario.');
        next(error);
    };
};

const updatePonenciaEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ponencia_estado } = req.body;
        const result = await pool.query('UPDATE ponencia SET ponencia_estado = $1 WHERE ponencia_id = $2 RETURNING *', [ponencia_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la ponencia.');
            return res.status(404).json('No se pudo actualizar el estado de la ponencia.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la ponencia.');
        next(error);
    };
};

module.exports = {
    getPonenciasPorUsuario,
    updatePonenciaEstado
};