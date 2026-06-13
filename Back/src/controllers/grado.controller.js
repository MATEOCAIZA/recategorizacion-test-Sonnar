const pool = require('../db');

const getGrados = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM grado');
        if (result.rowCount === 0) {
            return res.status(404).send('No hay grados.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al intentar obtener los grados.');
        next(error);
    };
};

const getGrado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM grado WHERE grado_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Grado no encontrado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener el grado.');
        next(error);
    };
};

const createGrado = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const resultMaxId = await pool.query('SELECT COALESCE(MAX(grado_id), 0) + 1 AS new_grado_id FROM grado');
        const newGradoId = resultMaxId.rows[0].new_grado_id;
        const result = await pool.query('INSERT INTO grado VALUES ($1, $2) RETURNING *', [newGradoId, nombre]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo crear el grado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar crear el grado.');
        next(error);
    };
};

const deleteGrado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM grado WHERE grado_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo eliminar el grado, puede que no exista.');
        };
        res.json('Grado eliminado correctamente.');
    } catch (error) {
        res.status(500).send('Hubo un error al intentar eliminar el grado.');
        next(error);
    };
};

const updateGrado = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const result = await pool.query('UPDATE grado SET nombre = $1 WHERE grado_id = $2 RETURNING *', [nombre, id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo actualizar el grado, puede que no exista.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar actualizar el grado.');
        next(error);
    };
};

module.exports = {
    getGrados,
    getGrado,
    createGrado,
    deleteGrado,
    updateGrado
};