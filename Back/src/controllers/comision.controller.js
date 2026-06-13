const pool = require("../db");

const getComisiones = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM comision");

    if (result.rowCount === 0) {
      return res.status(404).send("No hay comisiones.");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Error al intentar obtener las comisiones.");
    next(error);
  }
};

const getComision = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
                c.comision_id,
                c.comision_nombre,
                c.convocatoria_id,
                u.usuario_id,
                u.usuario_primernombre,
                u.usuario_segundonombre,
                u.usuario_primerapellido,
                u.usuario_segundoapellido,
                r.rol_nombre
            FROM 
                comision c
            JOIN 
                usuario u ON c.comision_id = u.comision_id
            JOIN 
                rol_usuario ru ON u.usuario_id = ru.usuario_id
            JOIN 
                rol r ON ru.rol_id = r.rol_id
            WHERE 
                c.comision_id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("No hay comisiones.");
    }

    const comision = {
      comision_id: result.rows[0].comision_id,
      comision_nombre: result.rows[0].comision_nombre,
      convocatoria_id: result.rows[0].convocatoria_id,
      integrantes: result.rows.map((row) => ({
        usuario_id: row.usuario_id,
        usuario_primernombre: row.usuario_primernombre,
        usuario_segundonombre: row.usuario_segundonombre,
        usuario_primerapellido: row.usuario_primerapellido,
        usuario_segundoapellido: row.usuario_segundoapellido,
        rol_nombre: row.rol_nombre,
      })),
    };

    res.json(comision);
  } catch (error) {
    res.status(500).send("Error al intentar obtener las comisiones.");
    next(error);
  }
};

const createComision = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const {
      comision,
      convocatoria_id,
      vicerrectorAcademicoGeneral,
      vicerrectorInvestigacion,
      vicerrectorDocencia,
      directorTTHH,
      directoresDepartamento,
      profesoresTitulares,
    } = req.body;
    const resultMaxId = await pool.query(
      "SELECT COALESCE(MAX(comision_id), 0) + 1 AS new_comision_id FROM comision"
    );
    const newComisionId = resultMaxId.rows[0].new_comision_id;

    client.query("BEGIN");

    const rolComision = await client.query(
      "SELECT rol_id FROM rol WHERE rol_nombre = $1",
      ["COMISION"]
    );
    console.log(rolComision);

    const resultComision = await client.query(
      "INSERT INTO comision (comision_id, convocatoria_id, comision_nombre) VALUES ($1, $2, $3) RETURNING *",
      [newComisionId, convocatoria_id, comision.comision_nombre]
    );
    const verificarVicerrectorAcademicoGeneral = await client.query(
      "SELECT * FROM rol_usuario WHERE usuario_id = $1",
      [vicerrectorAcademicoGeneral.usuario_id]
    );
    if (verificarVicerrectorAcademicoGeneral.rowCount > 0) {
      console.log("El usuario ya tiene un rol asignado.");
    } else {
      const resultVicerrectorAcademicoGeneral = await client.query(
        "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
        [rolComision.rows[0].rol_id, vicerrectorAcademicoGeneral.usuario_id]
      );
    }
    await client.query(
      "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
      [
        resultComision.rows[0].comision_id,
        vicerrectorAcademicoGeneral.usuario_id,
      ]
    );
    const verificarVicerrectorInvestigacion = await client.query(
      "SELECT * FROM rol_usuario WHERE usuario_id = $1",
      [vicerrectorInvestigacion.usuario_id]
    );
    if (verificarVicerrectorInvestigacion.rowCount > 0) {
      console.log("El usuario ya tiene un rol asignado.");
    } else {
      const resultVicerrectorInvestigacion = await client.query(
        "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
        [rolComision.rows[0].rol_id, vicerrectorInvestigacion.usuario_id]
      );
    }
    await client.query(
      "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
      [resultComision.rows[0].comision_id, vicerrectorInvestigacion.usuario_id]
    );
    const verificarVicerrectorDocencia = await client.query(
      "SELECT * FROM rol_usuario WHERE usuario_id = $1",
      [vicerrectorDocencia.usuario_id]
    );
    if (verificarVicerrectorDocencia.rowCount > 0) {
      console.log("El usuario ya tiene un rol asignado.");
    } else {
      const resultVicerrectorDocencia = await client.query(
        "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
        [rolComision.rows[0].rol_id, vicerrectorDocencia.usuario_id]
      );
    }
    await client.query(
      "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
      [resultComision.rows[0].comision_id, vicerrectorDocencia.usuario_id]
    );
    const verificarDirectorTTHH = await client.query(
      "SELECT * FROM rol_usuario WHERE usuario_id = $1",
      [directorTTHH.usuario_id]
    );
    if (verificarDirectorTTHH.rowCount > 0) {
      console.log("El usuario ya tiene un rol asignado.");
    } else {
      const resultDirectorTTHH = await client.query(
        "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
        [rolComision.rows[0].rol_id, directorTTHH.usuario_id]
      );
    }
    await client.query(
      "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
      [resultComision.rows[0].comision_id, directorTTHH.usuario_id]
    );

    for (let i = 0; i < directoresDepartamento.length; i++) {
      const verificarDirectoresDepartamento = await client.query(
        "SELECT * FROM rol_usuario WHERE usuario_id = $1",
        [directoresDepartamento[i].usuario_id]
      );
      if (verificarDirectoresDepartamento.rowCount > 0) {
        console.log("El usuario ya tiene un rol asignado.");
      } else {
        const resultDirectoresDepartamento = await client.query(
          "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
          [rolComision.rows[0].rol_id, directoresDepartamento[i].usuario_id]
        );
      }
      await client.query(
        "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
        [
          resultComision.rows[0].comision_id,
          directoresDepartamento[i].usuario_id,
        ]
      );
    }

    for (let i = 0; i < profesoresTitulares.length; i++) {
      const verificarProfesoresTitulares = await client.query(
        "SELECT * FROM rol_usuario WHERE usuario_id = $1",
        [profesoresTitulares[i].usuario_id]
      );
      if (verificarProfesoresTitulares.rowCount > 0) {
        console.log("El usuario ya tiene un rol asignado.");
      } else {
        const resultProfesoresTitulares = await client.query(
          "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2)",
          [rolComision.rows[0].rol_id, profesoresTitulares[i].usuario_id]
        );
      }
      await client.query(
        "UPDATE usuario SET comision_id = $1 WHERE usuario_id = $2",
        [resultComision.rows[0].comision_id, profesoresTitulares[i].usuario_id]
      );
    }

    client.query("COMMIT");
    res.json("Comision creada correctamente.");
  } catch (error) {
    console.log(error);
    client.query("ROLLBACK");
    res.status(500).json("Hubo un error al intentar crear la comision.");
    next(error);
  } finally {
    client.release();
  }
};

module.exports = {
  getComisiones,
  getComision,
  createComision,
};
