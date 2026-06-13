const pool = require('../db');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadDir = "uploads/convocatorias";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: async (req, file, cb) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const baseName = path.basename(originalName, extension);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newName = `${baseName}-${uniqueSuffix}${extension}`;
        cb(null, newName);
    },
});

const upload = multer({
    storage: storage,
});

const getConvocatorias = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM convocatoria');
        if (result.rowCount === 0) {
            return res.status(404).send('No hay convocatorias.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al intentar obtener las convocatorias.');
        next(error);
    };
}

const getConvocatoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM convocatoria WHERE convocatoria_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Convocatoria no encontrada.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener la convocatoria.');
        next(error);
    };
};

const getConvocatoriaAbierta = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM convocatoria WHERE estado = $1', ['ABIERTA']);
        if (result.rowCount === 0) {
            return res.status(404).send('No hay convocatorias abiertas.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar obtener la convocatoria.');
        next(error);
    };
};

const createConvocatoria = async (req, res, next) => {
    console.log("Creando convocatoria...");
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { fecha_inicio, fecha_fin, convocatoria_descripcion } = req.body;
        const convocatoria_archivo = req.file ? req.file : null;

        console.log("Los archivos son: ", req.file);
        console.log("El req body es: ", req.body);

        //Asignar la ubicacion del archivo de la convocatoria
        let convocatoria_ubicacion = null;
        if (convocatoria_archivo) {
            convocatoria_ubicacion = convocatoria_archivo.path.replace(/\\/g, "/");
        };

        const resultMaxId = await client.query('SELECT COALESCE(MAX(convocatoria_id), 0) + 1 AS new_convocatoria_id FROM convocatoria');
        const newConvocatoriaId = resultMaxId.rows[0].new_convocatoria_id;

        //Verificar si existe una convocatoria abierta
        const resultConvocatoriaAbierta = await client.query('SELECT * FROM convocatoria WHERE estado = $1', ['ABIERTA']);
        if (resultConvocatoriaAbierta.rowCount > 0) {
            console.log('Ya existe una convocatoria abierta.');
            return res.status(400).json('Ya existe una convocatoria abierta.');
        };
        const result = await client.query('INSERT INTO convocatoria (convocatoria_id, fecha_inicio, fecha_fin, estado, convocatoria_ubicacion, convocatoria_descripcion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [newConvocatoriaId, fecha_inicio, fecha_fin, 'ABIERTA', convocatoria_ubicacion, convocatoria_descripcion]);
        if (result.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear la convocatoria.');
        };

        const principal2Res = await client.query('SELECT * FROM grado WHERE grado_id = 2');
        const principal3Res = await client.query('SELECT * FROM grado WHERE grado_id = 7');
        const agregado1Res = await client.query('SELECT * FROM grado WHERE grado_id = 3');
        const agregado2Res = await client.query('SELECT * FROM grado WHERE grado_id = 4');
        const agregado3Res = await client.query('SELECT * FROM grado WHERE grado_id = 8');
        const auxiliar2Res = await client.query('SELECT * FROM grado WHERE grado_id = 6');

        const insertarCupoPrinciapl2 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, principal2Res.rows[0].grado_id, req.body.principal2]);
        if (insertarCupoPrinciapl2.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado principal 2.');
        }
        const insertarCupoPrinciapl3 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, principal3Res.rows[0].grado_id, req.body.principal3]);
        if (insertarCupoPrinciapl3.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado principal 3.');
        }
        const insertarCupoAgregado1 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, agregado1Res.rows[0].grado_id, req.body.agregado1]);
        if (insertarCupoAgregado1.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado agregado 1.');
        }
        const insertarCupoAgregado2 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, agregado2Res.rows[0].grado_id, req.body.agregado2]);
        if (insertarCupoAgregado2.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado agregado 2.');
        }
        const insertarCupoAgregado3 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, agregado3Res.rows[0].grado_id, req.body.agregado3]);
        if (insertarCupoAgregado3.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado agregado 3.');
        }
        const insertarCupoAuxiliar2 = await client.query('INSERT INTO convocatorias_grados (convocatoria_id, grado_id, cupo) VALUES ($1, $2, $3)', [newConvocatoriaId, auxiliar2Res.rows[0].grado_id, req.body.auxiliar2]);
        if (insertarCupoAuxiliar2.rowCount === 0) {
            client.query('ROLLBACK');
            return res.status(400).json('No se pudo crear el cupo para el grado auxiliar 2.');
        }

        await client.query('COMMIT');
        res.json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
        res.status(500).json('Hubo un error al intentar crear la convocatoria.');
        next(error);
    } finally {
        client.release();
    };
}

const deleteConvocatoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM convocatoria WHERE convocatoria_id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo eliminar la convocatoria, puede que no exista.');
        };
        res.json('Convocatoria eliminada correctamente.');
    } catch (error) {
        res.status(500).send('Hubo un error al intentar eliminar la convocatoria.');
        next(error);
    };
}

const updateConvocatoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fecha_inicio, fecha_fin } = req.body;
        const result = await pool.query('UPDATE convocatoria SET fecha_inicio = $1, fecha_fin = $2 WHERE convocatoria_id = $3 RETURNING *', [fecha_inicio, fecha_fin, id]);
        if (result.rowCount === 0) {
            return res.status(400).send('No se pudo actualizar la convocatoria.');
        };
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Hubo un error al intentar actualizar la convocatoria.');
        next(error);
    };
}

module.exports = {
    getConvocatorias,
    getConvocatoria,
    getConvocatoriaAbierta,
    createConvocatoria,
    deleteConvocatoria,
    updateConvocatoria,
    upload,
};