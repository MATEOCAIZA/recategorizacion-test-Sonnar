const pool = require('../db');

const getEvaluacionesPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query(
            `SELECT ev.* 
             FROM evaldocente ev 
             LEFT JOIN postulacion pos ON pos.postulacion_id = ev.postulacion_id 
             LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id 
             LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id 
             WHERE u.usuario_id = $1 
             AND con.estado = 'ABIERTA' 
             AND pos.postulacion_id = $2`, 
            [id, postulacion_id]
        );
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay evaluaciones asociadas a este usuario.');
            return res.status(404).json('No hay evaluaciones asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las evaluaciones asociadas a este usuario.');
        next(error);
    };
};

const updateEvaluacionEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { evaluacion_estado } = req.body;
        const result = await pool.query('UPDATE evaldocente SET ced_estado = $1 WHERE ced_id = $2 RETURNING *', [evaluacion_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la evaluacion.');
            return res.status(404).json('No se pudo actualizar el estado de la evaluacion.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la evaluacion.');
        next(error);
    };
};

module.exports = {
    getEvaluacionesPorUsuario,
    updateEvaluacionEstado
};