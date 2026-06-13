const pool = require("../db");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadDir = "uploads/postulacion";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const getLastPostulacionId = async () => {
  const result = await pool.query(
    "SELECT MAX(postulacion_id) as max_id FROM postulacion"
  );
  return result.rows[0].max_id || 0;
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const usuarioId = req.body.usuario_id;
      const lastPostulacionId = await getLastPostulacionId();
      const newPostulacionId = lastPostulacionId + 1;
      const usuarioDir = path.join(uploadDir, usuarioId);
      const postulacionDir = path.join(usuarioDir, newPostulacionId.toString());

      if (!fs.existsSync(usuarioDir)) {
        fs.mkdirSync(usuarioDir, { recursive: true });
      }

      if (!fs.existsSync(postulacionDir)) {
        fs.mkdirSync(postulacionDir, { recursive: true });
      }

      cb(null, postulacionDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${baseName}-${uniqueSuffix}${extension}`;
    cb(null, newName);
  },
});

const upload = multer({
  storage: storage,
});

const getPostulaciones = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from convocatoria con left join postulacion pos on con.convocatoria_id = pos.convocatoria_id left join usuario u on u.usuario_id = pos.usuario_id where con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json("No hay postulaciones para la convocatoria abierta actual.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM postulacion WHERE postulacion_id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No se encontró la postulación.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json("Error al intentar obtener la postulación.");
    next(error);
  }
};

const getPostulacionesAuxiliar1 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 5 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacionesAuxiliar2 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 6 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacionesAgregado1 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 3 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacionesAgregado2 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 4 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacionesPrincipal1 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 1 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const getPostulacionesPrincipal2 = async (req, res, next) => {
  try {
    const result = await pool.query(
      "select * from grado_usuario gu left join usuario u on gu.usuario_id = u.usuario_id left join postulacion pos on pos.usuario_id = u.usuario_id left join convocatoria con on con.convocatoria_id = pos.convocatoria_id where gu.grado_id = 2 and con.estado = 'ABIERTA'"
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No hay postulaciones en revisión.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json("Error al intentar obtener las postulaciones.");
    next(error);
  }
};

const createPostulacion = async (req, res, next) => {
  const client = await pool.connect();

  try {
    const { body, files } = req;

    client.query("BEGIN");

    const articulos = [];
    let index = 0;

    while (body[`articulo_nombrerevista_${index}`]) {
      const articulo = {
        articulo_titulo: body[`articulo_titulo_${index}`],
        articulo_nombrerevista: body[`articulo_nombrerevista_${index}`],
        articulo_ordenauditoria: body[`articulo_ordenauditoria_${index}`],
        articulo_doi: body[`articulo_doi_${index}`],
        articulo_issn: body[`articulo_issn_${index}`],
        articulo_fechapublicacion: body[`articulo_fechapublicacion_${index}`],
        articulo_bdindexada: body[`articulo_bdindexada_${index}`],
        articulo_cuartil: body[`articulo_cuartil_${index}`],
        articulo_link: body[`articulo_link_${index}`],
        articulo_ubicacion: "",
        articulo_estado: "ACEPTADO",
      };
      articulos.push(articulo);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a articulo_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/articulo_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (articulos[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          articulos[index].articulo_ubicacion = file.path.replace(/\\/g, "/");
        }
      }
    });

    const capacitaciones = [];
    index = 0;

    while (body[`capacitacion_nombreevento_${index}`]) {
      const capacitacion = {
        capacitacion_nombreevento: body[`capacitacion_nombreevento_${index}`],
        capacitacion_institucion: body[`capacitacion_institucion_${index}`],
        capacitacion_tipocertificado:
          body[`capacitacion_tipocertificado_${index}`],
        capacitacion_duracion: body[`capacitacion_duracion_${index}`],
        capacitacion_fechaevento: body[`capacitacion_fechaevento_${index}`],
        capacitacion_tipocapacitacion:
          body[`capacitacion_tipocapacitacion_${index}`],
        capacitacion_ubicacion: "",
        capacitacion_estado: "ACEPTADO",
      };
      capacitaciones.push(capacitacion);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a capacitacion_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/capacitacion_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (capacitaciones[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          capacitaciones[index].capacitacion_ubicacion = file.path.replace(
            /\\/g,
            "/"
          );
        }
      }
    });

    const grupoTesis = [];
    index = 0;

    while (body[`tesis_fechapublicacion_${index}`]) {
      const tesis = {
        tesis_titulo: body[`tesis_titulo_${index}`],
        tesis_fechapublicacion: body[`tesis_fechapublicacion_${index}`],
        tesis_fechacertificacion: body[`tesis_fechacertificacion_${index}`],
        tesis_tipodireccion: body[`tesis_tipodireccion_${index}`],
        tesis_externa: body[`tesis_externa_${index}`],
        tesis_universidad: body[`tesis_universidad_${index}`],
        tesis_ubicacion: "",
        tesis_estado: "ACEPTADO",
      };
      grupoTesis.push(tesis);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a tesis_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/tesis_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (grupoTesis[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          grupoTesis[index].tesis_ubicacion = file.path.replace(/\\/g, "/");
        }
      }
    });

    const investigaciones = [];
    index = 0;

    while (body[`investigacion_titulo_${index}`]) {
      const investigacion = {
        investigacion_titulo: body[`investigacion_titulo_${index}`],
        investigacion_fechainicio: body[`investigacion_fechainicio_${index}`],
        investigacion_fechafin: body[`investigacion_fechafin_${index}`],
        investigacion_tipoparticipacion:
          body[`investigacion_tipoparticipacion_${index}`],
        investigacion_resultados: body[`investigacion_resultados_${index}`],
        investigacion_enfoque: body[`investigacion_enfoque_${index}`],
        investigacion_ubicacion: "",
        investigacion_estado: "ACEPTADO",
      };
      investigaciones.push(investigacion);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a investigacion_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/investigacion_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (investigaciones[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          investigaciones[index].investigacion_ubicacion = file.path.replace(
            /\\/g,
            "/"
          );
        }
      }
    });

    const gestionesEducativas = [];
    index = 0;

    while (body[`ge_actividad_${index}`]) {
      const gestionEducativa = {
        ge_actividad: body[`ge_actividad_${index}`],
        ge_fechainicio: body[`ge_fechainicio_${index}`],
        ge_fechafin: body[`ge_fechafin_${index}`],
        ge_ubicacion: "",
        ge_estado: "ACEPTADO",
      };
      gestionesEducativas.push(gestionEducativa);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a ge_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/ge_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (gestionesEducativas[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          gestionesEducativas[index].ge_ubicacion = file.path.replace(
            /\\/g,
            "/"
          );
        }
      }
    });

    const ponencias = [];
    index = 0;

    while (body[`ponencia_nombre_${index}`]) {
      const ponencia = {
        ponencia_tipo: body[`ponencia_tipo_${index}`],
        ponencia_nombre: body[`ponencia_nombre_${index}`],
        ponencia_afinidad: body[`ponencia_afinidad_${index}`],
        ponencia_fecha: body[`ponencia_fecha_${index}`],
        ponencia_ubicacion: "",
        ponencia_estado: "ACEPTADO",
      };
      ponencias.push(ponencia);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a ponencia_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/ponencia_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (ponencias[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          ponencias[index].ponencia_ubicacion = file.path.replace(/\\/g, "/");
        }
      }
    });

    const actividadesExtra = [];
    index = 0;

    while (body[`adicional_criterio_${index}`]) {
      const actividad = {
        adicional_criterio: body[`adicional_criterio_${index}`],
        adicional_puntaje: null,
        adicional_comentario: null,
        actividad_ubicacion: "",
        actividad_estado: "ACEPTADO",
      };
      actividadesExtra.push(actividad);
      index++;
    }

    // Asignar el valor de path del archivo correspondiente a actividad_ubicacion
    files.forEach((file) => {
      const match = file.fieldname.match(/adicional_archivo_(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (actividadesExtra[index]) {
          // Reemplazar las barras invertidas por barras diagonales
          actividadesExtra[index].actividad_ubicacion = file.path.replace(
            /\\/g,
            "/"
          );
        }
      }
    });

    console.log("El req.body", body);

    const evaluacionDocente = {
      ced_porcentaje: body.ced_porcentaje,
      ced_ubicacion: "",
      ced_estado: "ACEPTADO",
    };

    // Asignar el valor de path del archivo correspondiente a ced_ubicacion
    files.forEach((file) => {
      if (file.fieldname === "ced_archivo") {
        console.log("El archivo", file);
        // Reemplazar las barras invertidas por barras diagonales
        evaluacionDocente.ced_ubicacion = file.path.replace(/\\/g, "/");
      }
    });

    const certificadoidioma = {
      idioma_nivel: body.idioma_nivel,
      idioma_tituloextranjero: null,
      idioma_ubicacion: "",
      idioma_estado: "ACEPTADO",
    }

    // Asignar el valor de path del archivo correspondiente a idioma_ubicacion
    files.forEach((file) => {
      if (file.fieldname === "idioma_archivo") {
        // Reemplazar las barras invertidas por barras diagonales
        certificadoidioma.idioma_ubicacion = file.path.replace(/\\/g, "/");
      }
    });

    const postulacionId = await client.query(
      `SELECT COALESCE(MAX(postulacion_id), 0) + 1 AS postulacion_id FROM postulacion`
    );
    const convocatoriaId = await client.query(
      `SELECT convocatoria_id FROM convocatoria WHERE estado = 'ABIERTA'`
    );
    console.log("ConvocatoriaId", convocatoriaId.rows[0].convocatoria_id);
    console.log("PostulacionId", postulacionId.rows[0].postulacion_id);
    console.log("UsuarioId", body.usuario_id);

    const postulacion = await client.query(
      `INSERT INTO postulacion (postulacion_id, usuario_id, convocatoria_id, usuariocomision_id, postulacion_estado, postulacion_calificacion, postulacion_tipoactividades)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        postulacionId.rows[0].postulacion_id,
        body.usuario_id,
        convocatoriaId.rows[0].convocatoria_id,
        null,
        "EN REVISION",
        null,
        null,
      ]
    );
    if (!postulacion) {
      client.query("ROLLBACK");
      return res.status(404).send("No se pudo crear la postulación.");
    }

    //Insertar nuevo artículo con nuevo ID
    articulos.forEach(async (articulo) => {
      const newArticulo = await client.query(
        `INSERT INTO articulo (postulacion_id, articulo_titulo, articulo_nombrerevista, articulo_ordenauditoria, articulo_doi, articulo_issn, articulo_fechapublicacion, articulo_bdindexada, articulo_cuartil, articulo_link, articulo_ubicacion, articulo_estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          postulacionId.rows[0].postulacion_id,
          articulo.articulo_titulo,
          articulo.articulo_nombrerevista,
          articulo.articulo_ordenauditoria,
          articulo.articulo_doi,
          articulo.articulo_issn,
          articulo.articulo_fechapublicacion,
          articulo.articulo_bdindexada,
          articulo.articulo_cuartil,
          articulo.articulo_link,
          articulo.articulo_ubicacion,
          null,
        ]
      );
      console.log("Articulo ID", newArticulo.rows[0].articulo_id);
      if (!newArticulo) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear el artículo.");
      }
    });

    //Insertar nueva capacitación con nuevo ID
    capacitaciones.forEach(async (capacitacion) => {
      const newCapacitacion = await client.query(
        `INSERT INTO capacitacion (postulacion_id, capacitacion_nombreevento, capacitacion_institucion, capacitacion_tipocertificado, capacitacion_duracion, capacitacion_fechaevento, capacitacion_tipocapacitacion, capacitacion_ubicacion, capacitacion_estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          postulacionId.rows[0].postulacion_id,
          capacitacion.capacitacion_nombreevento,
          capacitacion.capacitacion_institucion,
          capacitacion.capacitacion_tipocertificado,
          capacitacion.capacitacion_duracion,
          capacitacion.capacitacion_fechaevento,
          capacitacion.capacitacion_tipocapacitacion,
          capacitacion.capacitacion_ubicacion,
          null,
        ]
      );
      console.log("Capacitacion ID", newCapacitacion.rows[0].capacitacion_id);
      if (!newCapacitacion) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear la capacitación.");
      }
    });

    //Insertar nueva tesis con nuevo ID
    grupoTesis.forEach(async (tesis) => {
      const newTesis = await client.query(
        `INSERT INTO tesisdirigida (postulacion_id, tesis_titulo, tesis_fechapublicacion, tesis_fechacertificacion, tesis_tipodireccion, tesis_externa, tesis_universidad, tesis_ubicacion, tesis_estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          postulacionId.rows[0].postulacion_id,
          tesis.tesis_titulo,
          tesis.tesis_fechapublicacion,
          tesis.tesis_fechacertificacion,
          tesis.tesis_tipodireccion,
          tesis.tesis_externa === "SI" ? true : false,
          tesis.tesis_universidad,
          tesis.tesis_ubicacion,
          null,
        ]
      );
      if (!newTesis) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear la tesis.");
      }
    });

    //Insertar nueva investigación con nuevo ID
    investigaciones.forEach(async (investigacion) => {
      const newInvestigacion = await client.query(
        `INSERT INTO investigacion (postulacion_id, investigacion_titulo, investigacion_fechainicio, investigacion_fechafin, investigacion_tipoparticipacion, investigacion_resultados, investigacion_enfoque, investigacion_ubicacion, investigacion_estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          postulacionId.rows[0].postulacion_id,
          investigacion.investigacion_titulo,
          investigacion.investigacion_fechainicio,
          investigacion.investigacion_fechafin,
          investigacion.investigacion_tipoparticipacion,
          investigacion.investigacion_resultados,
          investigacion.investigacion_enfoque,
          investigacion.investigacion_ubicacion,
          null,
        ]
      );
      if (!newInvestigacion) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear la investigación.");
      }
    });

    //Insertar nueva gestión educativa con nuevo ID
    gestionesEducativas.forEach(async (gestionEducativa) => {
      const newGestionEducativa = await client.query(
        `INSERT INTO gestioneducativa (postulacion_id, ge_actividad, ge_fechainicio, ge_fechafin, ge_ubicacion, ge_estado)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          postulacionId.rows[0].postulacion_id,
          gestionEducativa.ge_actividad,
          gestionEducativa.ge_fechainicio,
          gestionEducativa.ge_fechafin,
          gestionEducativa.ge_ubicacion,
          gestionEducativa.ge.estado,
        ]
      );
      if (!newGestionEducativa) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear la gestión educativa.");
      }
    });

    //Insertar nueva ponencia con nuevo ID
    ponencias.forEach(async (ponencia) => {
      const newPonencia = await client.query(
        `INSERT INTO ponencia (postulacion_id, ponencia_tipo, ponencia_afinidad, ponencia_fecha, ponencia_ubicacion, ponencia_estado, ponencia_nombre)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          postulacionId.rows[0].postulacion_id,
          ponencia.ponencia_tipo,
          ponencia.ponencia_afinidad,
          ponencia.ponencia_fecha,
          ponencia.ponencia_ubicacion,
          null,
          ponencia.ponencia_nombre,
        ]
      );
      if (!newPonencia) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear la ponencia.");
      }
    });

    console.log("Actividades Extra Length", actividadesExtra.length);
    if (actividadesExtra.length > 0) {
      actividadesExtra.forEach(async (actividad) => {
        const newActividad = await client.query(
          `INSERT INTO adicional (postulacion_id, adicional_criterio, adicional_puntaje, adicional_comentario, adicional_ubicacion, adicional_estado)
        VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            postulacionId.rows[0].postulacion_id,
            actividad.adicional_criterio,
            actividad.adicional_puntaje,
            actividad.adicional_comentario,
            actividad.actividad_ubicacion,
            null,
          ]
        );
        if (!newActividad) {
          client.query("ROLLBACK");
          return res
            .status(404)
            .send("No se pudo crear la actividad adicional.");
        }
      });
    }

    //Insertar nueva evaluación docente con nuevo ID
    const evalDocenteRes = await client.query(
      `INSERT INTO evaldocente (postulacion_id, ced_porcentaje, ced_ubicacion, ced_estado)
      VALUES ($1, $2, $3, $4)`,
      [
        postulacionId.rows[0].postulacion_id,
        evaluacionDocente.ced_porcentaje,
        evaluacionDocente.ced_ubicacion,
        null
      ]
    );

    if (!evalDocenteRes) {
      client.query("ROLLBACK");
      return res
        .status(404)
        .json("No se pudo crear la evaluación docente.");
    }

    //Insertar nuevo certificado idioma con nuevo ID
    const certificadoIdiomaRes = await client.query(
      `INSERT INTO certificadoidioma (postulacion_id, idioma_nivel, idioma_tituloextranjero, idioma_ubicacion, idioma_estado)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        postulacionId.rows[0].postulacion_id,
        certificadoidioma.idioma_nivel,
        certificadoidioma.idioma_tituloextranjero,
        certificadoidioma.idioma_ubicacion,
        null
      ]
    );

    if (!certificadoIdiomaRes) {
      client.query("ROLLBACK");
      return res
        .status(404)
        .json("No se pudo crear el certificado de idioma.");
    }

    client.query("COMMIT");

    res.json({ message: "Datos y múltiples archivos recibidos correctamente" });
  } catch (error) {
    client.query("ROLLBACK");
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al intentar crear la postulación." });
  } finally {
    client.release();
  }
};

const updatePostulacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postulacion_calificacion, postulacion_estado } = req.body;
    console.log("El id", id);
    console.log("El body", req.body);

    const result = await pool.query(
      "UPDATE postulacion SET postulacion_calificacion = $1, postulacion_estado = $2 WHERE postulacion_id  = $3 RETURNING *",
      [postulacion_calificacion, postulacion_estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No se encontró la postulación.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json("Error al intentar actualizar la postulación.");
    next(error);
  }
};

const updateUsuarioDesignado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usuariocomision_id } = req.body;

    console.log("El id", id);
    console.log("El body", req.body); 

    const result = await pool.query(
      "UPDATE postulacion SET usuariocomision_id = $1 WHERE postulacion_id  = $2 RETURNING *",
      [usuariocomision_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("No se encontró la postulación.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error al intentar actualizar la postulación.");
    next(error);
  }
};

module.exports = {
  getPostulaciones,
  getPostulacion,
  getPostulacionesAuxiliar1,
  getPostulacionesAuxiliar2,
  getPostulacionesAgregado1,
  getPostulacionesAgregado2,
  getPostulacionesPrincipal1,
  getPostulacionesPrincipal2,
  createPostulacion,
  updatePostulacion,
  updateUsuarioDesignado,
  upload,
};
