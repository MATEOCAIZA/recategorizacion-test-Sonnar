const pool = require('../db');

const getConvocatoriasGrados = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM convocatorias_grados cg LEFT JOIN convocatoria con ON cg.convocatoria_id = con.convocatoria_id WHERE con.estado = $1', ['ABIERTA']);
        if (result.rowCount === 0) {
            console.log(result);
            console.log('No hay convocatorias de grados abiertas.');
            return res.status(404).json('No hay convocatorias de grados abiertas.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).json('Error al intentar obtener las convocatorias de grados.');
        next(error);
    };
};

module.exports = {
    getConvocatoriasGrados
};