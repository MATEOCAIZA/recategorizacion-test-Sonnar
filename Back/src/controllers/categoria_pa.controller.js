const pool = require('../db');

const getCategoriasPa = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM categoria_pa');
        if (result.rowCount === 0) {
            return res.status(404).send('No hay categorias de productos asociados.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al intentar obtener las categorias de productos asociados.');
        next(error);
    };
};

const getCategoriaPa = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM categoria_pa WHERE categoria_pa_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Categoria de producto asociado no encontrada.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener la categoria de producto asociado.');
        next(error);
    };
};

const createCategoriaPa = async (req, res, next) => {
    try {
        const { nombre } = req.body;
        const resultMaxId = await pool.query('SELECT COALESCE(MAX(categoria_pa_id), 0) + 1 AS new_categoria_pa_id FROM categoria_pa');
        const newCategoriaPaId = resultMaxId.rows[0].new_categoria_pa_id;
        const result = await pool.query('INSERT INTO categoria_pa VALUES ($1, $2) RETURNING *', [newCategoriaPaId, nombre]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo crear la categoria de producto asociado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar crear la categoria de producto asociado.');
        next(error);
    };
};

const deleteCategoriaPa = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM categoria_pa WHERE categoria_pa_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo eliminar la categoria de producto asociado, puede que no exista.');
        };
    } catch (error) {
        res.status(500).send('Hubo un error al intentar eliminar la categoria de producto asociado.');
        next(error);
    };
};

const updateCategoriaPa = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const result = await pool.query('UPDATE categoria_pa SET nombre = $1 WHERE categoria_pa_id = $2 RETURNING *', [nombre, id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo actualizar la categoria de producto asociado.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar actualizar la categoria de producto asociado.');
        next(error);
    };
};

module.exports = {
    getCategoriasPa,
    getCategoriaPa,
    createCategoriaPa,
    deleteCategoriaPa,
    updateCategoriaPa
};