import {
  Autocomplete,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import config from "../config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Users = () => {
  const [categorias, setCategorias] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [grados, setGrados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState({});
  const [openAgregarUsuarioModal, setOpenAgregarUsuarioModal] = useState(false);
  const [openAgregarRolModal, setOpenAgregarRolModal] = useState(false);
  const [cedulaError, setCedulaError] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedNivel, setSelectedNivel] = useState(null);

  const handleCrearUsuario = async () => {
    const token = Cookies.get("token");
    console.log("Usuario a crear: ", usuario);
    const response = await fetch(`${config.apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(usuario),
    });
    const data = await response.json();
    console.log("Data: ", data);
    if (response.ok) {
      toast.success("Usuario creado correctamente.");
      handleCargarUsuarios();
      setOpenAgregarUsuarioModal(false);
      setUsuario({});
    } else {
      toast.error("Error al crear el usuario.");
    }
  };

  const handleCargarUsuarios = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${config.apiBaseUrl}/users`, {
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setUsuarios(data);
  };

  const handleCargarRoles = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${config.apiBaseUrl}/roles`, {
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setRoles(data);
  };

  const handleCargarCategorias = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${config.apiBaseUrl}/categorias_pa`, {
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setCategorias(data);
  };

  const handleCargarNiveles = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${config.apiBaseUrl}/niveles`, {
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setNiveles(data);
  };

  const handleCargarGrados = async () => {
    const token = Cookies.get("token");
    const response = await fetch(`${config.apiBaseUrl}/grados`, {
      headers: {
        token: token,
      },
    });
    const data = await response.json();
    setGrados(data);
  };

  const handleCrearRol = async () => {
    const token = Cookies.get("token");
    console.log("Rol a crear: ", rol);
    const response = await fetch(`${config.apiBaseUrl}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(rol),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Rol creado correctamente.");
      handleCargarRoles();
    } else {
      toast.error("Error al crear el rol.");
    }
  };

  const validarCedulaEcuatoriana = (cedula) => {
    if (cedula.length !== 10) {
      return false;
    }

    const digitoRegion = parseInt(cedula.substring(0, 2));
    if (digitoRegion < 1 || digitoRegion > 24) {
      return false;
    }

    const ultimoDigito = parseInt(cedula.substring(9, 10));
    const pares =
      parseInt(cedula.substring(1, 2)) +
      parseInt(cedula.substring(3, 4)) +
      parseInt(cedula.substring(5, 6)) +
      parseInt(cedula.substring(7, 8));
    let impares = 0;

    for (let i = 0; i < 9; i += 2) {
      let digito = parseInt(cedula.substring(i, i + 1)) * 2;
      if (digito > 9) {
        digito -= 9;
      }
      impares += digito;
    }

    const sumaTotal = pares + impares;
    const primerDigitoSuma = String(sumaTotal).substring(0, 1);
    const decena = (parseInt(primerDigitoSuma) + 1) * 10;
    const digitoValidador = decena - sumaTotal;

    return (
      digitoValidador === ultimoDigito ||
      (digitoValidador === 10 && ultimoDigito === 0)
    );
  };

  const handleCedulaChange = (e) => {
    const cedula = e.target.value;
    setUsuario({ ...usuario, usuario_cedula: cedula });
    if (!validarCedulaEcuatoriana(cedula)) {
      setCedulaError("Cédula inválida");
    } else {
      setCedulaError("");
    }
  };

  useEffect(() => {
    handleCargarRoles();
    handleCargarUsuarios();
    console.log("Usuarios cargados: ", usuarios);
  }, []);

  const filteredNivel = selectedCategoria ? niveles.filter((nivel) => {
    return nivel.categoriapa_id === selectedCategoria.categoriapa_id;
  }) : [];

  const filteredGrado = selectedNivel ? grados.filter((grado) => {
    return grado.nivel_id === selectedNivel.nivel_id;
  }) : [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Lista de usuarios
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            marginRight: 2,
          }}
          size="small"
          onClick={() => {
            handleCargarCategorias();
            handleCargarNiveles();
            handleCargarGrados();
            setOpenAgregarUsuarioModal(true);
          }}
        >
          CREAR USUARIO
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            marginRight: 2,
          }}
          size="small"
          onClick={() => setOpenAgregarRolModal(true)}
        >
          CREAR ROL
        </Button>
        <TextField
          label="Buscar usuario"
          variant="outlined"
          sx={{
            width: "60%",
          }}
          size="small"
        />
      </Box>
      <TableContainer
        component={Paper}
        style={{
          width: "90%",
          maxHeight: "70vh",
          overflowY: "scroll",
          overflowX: "scroll",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>CI</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.user_id}>
                <TableCell>{usuario.usuario_cedula}</TableCell>
                <TableCell>{usuario.usuario_primernombre}</TableCell>
                <TableCell>{usuario.usuario_primerapellido}</TableCell>
                <TableCell>{usuario.usuario_username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openAgregarUsuarioModal}
        onClose={() => setOpenAgregarUsuarioModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "rgb(204, 204, 204)",
            boxShadow: 24,
            borderRadius: "5px",
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              Crear usuario
            </Typography>
            <TextField
              label="Primer nombre"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={(e) =>
                setUsuario({ ...usuario, usuario_primernombre: e.target.value })
              }
            />
            <TextField
              label="Segundo nombre"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  usuario_segundonombre: e.target.value,
                })
              }
            />
            <TextField
              label="Primer apellido"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  usuario_primerapellido: e.target.value,
                })
              }
            />
            <TextField
              label="Segundo apellido"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={(e) =>
                setUsuario({
                  ...usuario,
                  usuario_segundoapellido: e.target.value,
                })
              }
            />
            <TextField
              label="Cédula"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={handleCedulaChange}
              error={!!cedulaError}
              helperText={cedulaError}
            />
            <TextField
              label="Nivel de estudios"
              variant="outlined"
              sx={{
                width: "100%",
                marginBottom: 2,
              }}
              size="small"
              onChange={(e) =>
                setUsuario({ ...usuario, usuario_nivelestudio: e.target.value })
              }
            />
            <Autocomplete
              options={["Ing.", "Lic.", "Dr.", "Msc.", "Mgtr.", "PhD"]}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Título" variant="outlined" />
              )}
              onChange={(e, value) =>
                setUsuario({ ...usuario, usuario_tipo: value })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                justifyContent: "center",
                width: "100%",
                marginBottom: 2,
              }}
            >
              <Autocomplete
                options={categorias}
                getOptionLabel={(option) => option.categoriapa_nombre}
                style={{ paddingRight: "2%", width: "33%" }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Categoría" variant="outlined" />
                )}
                onChange={(e, value) =>
                  setSelectedCategoria(value ? value : null)
                }
              />
              <Autocomplete
                options={filteredNivel}
                getOptionLabel={(option) => option.nivel_nombre}
                style={{ paddingRight: "2%", width: "33%" }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Nivel" variant="outlined" />
                )}
                onChange={(e, value) => {
                  setSelectedNivel(value ? value : null);
                }}
              />
              <Autocomplete
                options={filteredGrado}
                getOptionLabel={(option) => option.grado_nombre}
                style={{ width: "33%" }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Grado" variant="outlined" />
                )}
                onChange={(e, value) =>
                  setUsuario({
                    ...usuario,
                    grado: value ? value : null,
                  })
                }
              />
            </Box>
            <Autocomplete
              multiple
              options={roles}
              getOptionLabel={(option) => option.rol_nombre}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Roles" variant="outlined" />
              )}
              onChange={(e, value) =>
                setUsuario({
                  ...usuario,
                  roles: value.map((role) => ({
                    rol_id: role.rol_id,
                    rol_nombre: role.rol_nombre,
                  })),
                })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  marginRight: 2,
                }}
                size="small"
                onClick={() => setOpenAgregarUsuarioModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                }}
                size="small"
                onClick={handleCrearUsuario}
                disabled={!!cedulaError}
              >
                Crear usuario
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openAgregarRolModal}
        onClose={() => setOpenAgregarRolModal(false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "rgb(204, 204, 204)",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "1rem" }}
          >
            Crear rol
          </Typography>
          <TextField
            label="Nombre del rol"
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: 2,
            }}
            size="small"
            onChange={(e) => setRol({ ...rol, rol_nombre: e.target.value })}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                marginRight: 2,
                marginBottom: 2,
              }}
              size="small"
              onClick={() => setOpenAgregarRolModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                marginBottom: 2,
              }}
              size="small"
              onClick={handleCrearRol}
            >
              Crear rol
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;
