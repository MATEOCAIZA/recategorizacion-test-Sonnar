const pool = require('../db');

const getNiveles = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM nivel');
        if (result.rowCount === 0) {
            return res.status(404).send('No hay niveles.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al intentar obtener los niveles.');
        next(error);
    };
};

const getNivel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM nivel WHERE nivel_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Nivel no encontrado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener el nivel.');
        next(error);
    };
};

const createNivel = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const resultMaxId = await pool.query('SELECT COALESCE(MAX(nivel_id), 0) + 1 AS new_nivel_id FROM nivel');
        const newNivelId = resultMaxId.rows[0].new_nivel_id;
        const result = await pool.query('INSERT INTO nivel VALUES ($1, $2) RETURNING *', [newNivelId, nombre]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo crear el nivel.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar crear el nivel.');
        next(error);
    };
};

const deleteNivel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM nivel WHERE nivel_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo eliminar el nivel, puede que no exista.');
        };
        res.json('Nivel eliminado correctamente.');
    } catch (error) {
        res.status(500).send('Hubo un error al intentar eliminar el nivel.');
        next(error);
    };
};

const updateNivel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const result = await pool.query('UPDATE nivel SET nombre = $1 WHERE nivel_id = $2 RETURNING *', [nombre, id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo actualizar el nivel, puede que no exista.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar actualizar el nivel.');
        next(error);
    };
};

module.exports = {
    getNiveles,
    getNivel,
    createNivel,
    deleteNivel,
    updateNivel
};