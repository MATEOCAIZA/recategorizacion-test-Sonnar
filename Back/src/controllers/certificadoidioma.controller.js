const pool = require('../db');

const getCertificadosIdiomaPorUsuario = async (req, res, next) => {
    try {
        const { id, postulacion_id } = req.params;
        const result = await pool.query(
            `SELECT ci.* 
             FROM certificadoidioma ci 
             LEFT JOIN postulacion pos ON pos.postulacion_id = ci.postulacion_id 
             LEFT JOIN usuario u ON pos.usuario_id = u.usuario_id 
             LEFT JOIN convocatoria con ON con.convocatoria_id = pos.convocatoria_id 
             WHERE u.usuario_id = $1 
             AND con.estado = 'ABIERTA' 
             AND pos.postulacion_id = $2`, 
            [id, postulacion_id]
        );
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay certificados de idioma asociados a este usuario.');
            return res.status(404).json('No hay certificados de idioma asociados a este usuario.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener los certificados de idioma asociados a este usuario.');
        next(error);
    };
};

const updateCertificadoIdiomaEstado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { idioma_estado } = req.body;
        const result = await pool.query('UPDATE certificadoidioma SET idioma_estado = $1 WHERE idioma_id = $2 RETURNING *', [idioma_estado, id]);
        if (result.rowCount === 0) {
            console.log('No se pudo actualizar el estado del certificado de idioma.');
            return res.status(404).json('No se pudo actualizar el estado del certificado de idioma.');
        };
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error al intentar actualizar el estado del certificado de idioma.');
        next(error);
    };
};

module.exports = {
    getCertificadosIdiomaPorUsuario,
    updateCertificadoIdiomaEstado
};