const pool = require('../db');

const getCapacitacionesPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query('SELECT cap.* FROM capacitacion cap LEFT JOIN postulacion pos ON pos.postulacion_id = cap.postulacion_id LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id WHERE u.usuario_id = $1 AND con.estado = \'ABIERTA\' AND cap.postulacion_id = $2', [id, postulacion_id]);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay capacitaciones asociadas a este usuario.');
            return res.status(404).json('No hay capacitaciones asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las capacitaciones asociadas a este usuario.');
        next(error);
    };
};

const updateCapacitacionEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { capacitacion_estado } = req.body;
        const result = await pool.query('UPDATE capacitacion SET capacitacion_estado = $1 WHERE capacitacion_id = $2 RETURNING *', [capacitacion_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la capacitacion.');
            return res.status(404).json('No se pudo actualizar el estado de la capacitacion.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la capacitacion.');
        next(error);
    };
};

module.exports = {
    getCapacitacionesPorUsuario,
    updateCapacitacionEstado
};