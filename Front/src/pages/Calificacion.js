import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import config from "../config";

const Calificacion = () => {
  const [openAsignarUsuarioModal, setOpenAsignarUsuarioModal] = useState(false);
  const [usuariosComision, setUsuariosComision] = useState([]);
  const [postulaciones, setPostulaciones] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState(null);
  const [postulacionSeleccionada, setPostulacionSeleccionada] = useState(null);

  const handleOpenAsignarUsuarioModal = () => {
    setOpenAsignarUsuarioModal(true);
  };

  const handleCloseAsignarUsuarioModal = () => {
    setOpenAsignarUsuarioModal(false);
  };

  const handleObtenerUsuariosComision = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/comision-users`, {
        method: "GET",
        headers: { token: Cookies.get("token") },
      });
      const data = await response.json();
      setUsuariosComision(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleObtenerPostulaciones = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/postulaciones`, {
        method: "GET",
        headers: { token: Cookies.get("token") },
      });
      const data = await response.json();
      setPostulaciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDesignarUsuario = async () => {
    try {
      console.log("El usuario asignado es: ", usuarioAsignado.usuario_id);
      console.log(postulacionSeleccionada);
      const response = await fetch(
        `${config.apiBaseUrl}/designar-postulacion/${postulacionSeleccionada}`,
        {
          method: "PUT",
          headers: {
            token: Cookies.get("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuariocomision_id: usuarioAsignado.usuario_id,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Usuario asignado correctamente");
        handleCloseAsignarUsuarioModal();
        handleObtenerPostulaciones();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleObtenerPostulaciones();
    handleObtenerUsuariosComision();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: "1rem" }}>
        Lista de postulantes de la convocatoria abierta
      </h3>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "70%",
          overflowX: "auto",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Cédula
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Calificación
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Estado
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Miembro asignado
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postulaciones.map((row) => (
              <TableRow key={row.usuario_id}>
                <TableCell>{row.usuario_cedula}</TableCell>
                <TableCell>
                  {row.usuario_primernombre} {row.usuario_segundonombre}{" "}
                  {row.usuario_primerapellido} {row.usuario_segundoapellido}
                </TableCell>
                <TableCell>
                  {row.postulacion_calificacion
                    ? row.postulacion_calificacion
                    : "No disponible por el momento"}
                </TableCell>
                <TableCell>{row.postulacion_estado}</TableCell>
                <TableCell>
                  {(() => {
                    const usuarioAsignado = usuariosComision.find(
                      (usuario) => usuario.usuario_id === row.usuariocomision_id
                    );
                    return usuarioAsignado
                      ? `${usuarioAsignado.usuario_primernombre} ${usuarioAsignado.usuario_primerapellido}`
                      : "No asignado";
                  })()}
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        marginRight: "1rem",
                        backgroundColor: "rgb(0, 113, 121)",
                        "&:hover": {
                          backgroundColor: "rgb(7, 83, 88)",
                        },
                      }}
                      onClick={() =>
                        navigate(
                          `/postulacion-calificacion/${row.postulacion_id}`
                        )
                      }
                    >
                      Ver postulación
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "rgb(0, 113, 121)",
                        "&:hover": {
                          backgroundColor: "rgb(7, 83, 88)",
                        },
                      }}
                      onClick={() => {
                        setPostulacionSeleccionada(row.postulacion_id);
                        handleOpenAsignarUsuarioModal();
                      }}
                    >
                      Designar miembro de comisión
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openAsignarUsuarioModal}
        onClose={handleCloseAsignarUsuarioModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            borderRadius: "5px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>
              Asignar usuario de la comisión
            </h3>
            <Autocomplete
              options={usuariosComision}
              getOptionLabel={(option) =>
                `${option.usuario_primernombre} ${option.usuario_segundonombre} ${option.usuario_primerapellido} ${option.usuario_segundoapellido}`
              }
              style={{ width: 300 }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Usuario" />
              )}
              onChange={(event, value) => setUsuarioAsignado(value)}
            />
            <Box>
              <Button
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  marginRight: "1rem",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
                onClick={handleCloseAsignarUsuarioModal}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginTop: "1rem",
                  backgroundColor: "rgb(0, 113, 121)",
                  "&:hover": {
                    backgroundColor: "rgb(7, 83, 88)",
                  },
                }}
                onClick={() => handleDesignarUsuario()}
              >
                Asignar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calificacion;
