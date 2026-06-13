const pool = require('../db');

const getInvestigacionesPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query('SELECT inv.* FROM investigacion inv LEFT JOIN postulacion pos ON pos.postulacion_id = inv.postulacion_id LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id WHERE u.usuario_id = $1 AND con.estado = \'ABIERTA\' AND inv.postulacion_id = $2', [id, postulacion_id]);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay investigaciones asociadas a este usuario.');
            return res.status(404).json('No hay investigaciones asociadas a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las investigaciones asociadas a este usuario.');
        next(error);
    };
};

const handleUpdateInvestigacionEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { investigacion_estado } = req.body;
        const result = await pool.query('UPDATE investigacion SET investigacion_estado = $1 WHERE investigacion_id = $2 RETURNING *', [investigacion_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado de la investigacion.');
            return res.status(404).json('No se pudo actualizar el estado de la investigacion.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado de la investigacion.');
        next(error);
    };
};

module.exports = {
    getInvestigacionesPorUsuario,
    handleUpdateInvestigacionEstado
};