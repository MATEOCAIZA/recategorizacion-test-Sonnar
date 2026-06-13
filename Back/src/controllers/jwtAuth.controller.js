const pool = require("../db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    if (rowCount === 0) {
      return res.status(404).send("No hay usuarios.");
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Error al intentar obtener los usuarios.");
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).send("Usuario no encontrado.");
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Hubo un error al intentar obtener el usuario.");
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const client = await pool.connect();
  try {
    let {
      grado,
      usuario_cedula,
      usuario_nivelestudio,
      usuario_tipo,
      usuario_primernombre,
      usuario_segundonombre,
      usuario_primerapellido,
      usuario_segundoapellido,
      roles,
    } = req.body;

    console.log(req.body);

    client.query("BEGIN");

    const user = await client.query(
      "SELECT * FROM usuario WHERE usuario_cedula = $1",
      [usuario_cedula]
    );

    if (user.rows.length !== 0) {
      return res
        .status(401)
        .json("El usuario ya existe, ingrese un usuario diferente");
    }

    // Generar un ID de usuario único
    const resultMaxId = await client.query(
      "SELECT COALESCE(MAX(usuario_id), 0) + 1 AS new_usuario_id FROM usuario"
    );
    const usuario_id = resultMaxId.rows[0].new_usuario_id;

    // Extraer las primeras letras del primer y segundo nombre
    const firstNameInitial = usuario_primernombre.charAt(0).toLowerCase();
    const secondNameInitial = usuario_segundonombre.charAt(0).toLowerCase();

    // Extraer la primera palabra del primer apellido
    const firstSurnameWord = usuario_primerapellido.split(" ")[0].toLowerCase();

    // Formar el nombre de usuario base
    let baseUsername = `${firstNameInitial}${secondNameInitial}${firstSurnameWord}`;

    // Verificar si el nombre de usuario ya existe en la base de datos
    let usuario_username = baseUsername;
    let counter = 1;
    let userExists = true;

    while (userExists) {
      const result = await client.query(
        "SELECT COUNT(*) FROM usuario WHERE usuario_username = $1",
        [usuario_username]
      );
      if (result.rows[0].count == 0) {
        userExists = false;
      } else {
        usuario_username = `${baseUsername}${counter}`;
        counter++;
      }
    }

    const usuario_correo = `${usuario_username}` + "@espe.edu.ec";

    // Generar una contraseña aleatoria
    const generatedPassword = crypto.randomBytes(8).toString("hex"); // Genera una contraseña de 16 caracteres

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(generatedPassword, salt);

    const newUser = await client.query(
      "INSERT INTO usuario (usuario_id, subcomision_id, comision_id, delegante_id, usuario_username, usuario_pswrd, usuario_cedula, usuario_nivelestudio, usuario_tipo, usuario_correo, usuario_primernombre, usuario_segundonombre, usuario_primerapellido, usuario_segundoapellido) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        usuario_id,
        null,
        null,
        null,
        usuario_username,
        bcryptPassword,
        usuario_cedula,
        usuario_nivelestudio,
        usuario_tipo,
        usuario_correo,
        usuario_primernombre,
        usuario_segundonombre,
        usuario_primerapellido,
        usuario_segundoapellido,
      ]
    );
    if (newUser.rowCount === 0) {
      client.query("ROLLBACK");
      return res.status(404).send("No se pudo crear el usuario.");
    }

    //Insertar roles
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      const newRole = await client.query(
        "INSERT INTO rol_usuario (rol_id, usuario_id) VALUES ($1, $2) RETURNING *",
        [role.rol_id, usuario_id]
      );
      if (newRole.rowCount === 0) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear el rol.");
      }
    }

    //Insertar
    if (grado) {
      const newGrado = await client.query(
        "INSERT INTO grado_usuario (grado_id, usuario_id, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4) RETURNING *",
        [grado.grado_id, usuario_id, new Date(), null]
      );
      if (newGrado.rowCount === 0) {
        client.query("ROLLBACK");
        return res.status(404).send("No se pudo crear el grado.");
      }
    };

    client.query("COMMIT");

    // Enviar la contraseña generada al cliente (por ejemplo, en la respuesta o por correo electrónico)
    res.json({ user: newUser.rows[0], generatedPassword });
  } catch (error) {
    console.log(error);
    client.query("ROLLBACK");
    res.status(500).json(error.message);
  } finally {
    client.release();
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { usuario_username, usuario_pswrd } = req.body;
    console.log(usuario_username, usuario_pswrd);
    const user = await pool.query(
      "SELECT * FROM usuario WHERE usuario_username = $1",
      [usuario_username]
    );
    console.log(user);
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json("Correo electrónico o contraseña incorrectos.");
    }

    const validPassword = await bcrypt.compare(
      usuario_pswrd,
      user.rows[0].usuario_pswrd
    );

    if (!validPassword) {
      return res
        .status(401)
        .json("Correo electrónico o contraseña incorrectos.");
    }

    const token = jwtGenerator(user.rows[0].usuario_id);

    res.json({ token, userId: user.rows[0].usuario_id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error del servidor.");
  }
};

const verifyUser = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    // Verificar que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json("Las nuevas contraseñas no coinciden");
    }

    // Obtener el usuario de la base de datos
    const user = await pool.query("SELECT * FROM usuario WHERE usuario_id = $1", [
      id,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json("Usuario no encontrado");
    }

    // Verificar la contraseña actual
    const validPassword = await bcrypt.compare(
      currentPassword,
      user.rows[0].usuario_pswrd
    );
    if (!validPassword) {
      return res.status(401).json("Contraseña actual incorrecta");
    }

    // Encriptar la nueva contraseña
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    const userUpdated = await pool.query(
      "UPDATE usuario SET usuario_pswrd = $1 WHERE usuario_id = $2 RETURNING *",
      [bcryptPassword, id]
    );
    res.json("Contraseña actualizada correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error del servidor");
    next(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario
    const { password } = req.body; // Nueva contraseña proporcionada desde el front-end

    // Encriptar la nueva contraseña
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Actualizar la contraseña en la base de datos
    await pool.query(
      "UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *",
      [bcryptPassword, id]
    );

    res.json("Contraseña reestablecida correctamente");
  } catch (error) {
    res.status(500).json("Error del servidor");
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  verifyUser,
  changePassword,
  resetPassword,
};
