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
import Cookies from "js-cookie";
import config from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NuevaComision = () => {
  const [comision, setComision] = useState({});
  const [convocatoria, setConvocatoria] = useState({});
  const [openAgregarDirectorModal, setOpenAgregarDirectorModal] =
    useState(false);
  const [openAgregarTitularModal, setOpenAgregarTitularModal] = useState(false);
  const [docentes, setDocentes] = useState([]);
  const [titulares, setTitulares] = useState([]);
  const [selectedTitular, setSelectedTitular] = useState({});
  const [titularesAsignados, setTitularesAsignados] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState({});
  const [directoresAsignados, setDirectoresAsignados] = useState([]);
  const [vicerrectorAcademicoGeneral, setVicerrectorAcademicoGeneral] =
    useState({});
  const [vicerrectorInvestigacion, setVicerrectorInvestigacion] = useState({});
  const [vicerrectorDocencia, setVicerrectorDocencia] = useState({});
  const [directorTalentoHumano, setDirectorTalentoHumano] = useState({});

  const navigate = useNavigate();

  const handleOpenAgregarDirectorModal = () => {
    setOpenAgregarDirectorModal(true);
  };

  const handleCloseAgregarDirectorModal = () => {
    setOpenAgregarDirectorModal(false);
  };

  const handleOpenAgregarTitularModal = () => {
    setOpenAgregarTitularModal(true);
  };

  const handleCloseAgregarTitularModal = () => {
    setOpenAgregarTitularModal(false);
  };

  const handleObtenerUsuariosRoles = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/users-roles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      const data = await response.json();
      setDocentes(data);
      setVicerrectorAcademicoGeneral(
        data.find(
          (docente) => docente.rol_nombre === "VICERRECTOR ACADEMICO GENERAL"
        )
      );
      setVicerrectorInvestigacion(
        data.find(
          (docente) => docente.rol_nombre === "VICERRECTOR DE INVESTIGACION"
        )
      );
      setDirectorTalentoHumano(
        data.find(
          (docente) => docente.rol_nombre === "DIRECTOR DE UNIDAD DE TTHH"
        )
      );
      setVicerrectorDocencia(
        data.find((docente) => docente.rol_nombre === "VICERRECTOR DE DOCENCIA")
      );
      setDirectores(
        data.filter(
          (docente) => docente.rol_nombre === "DIRECTOR DE DEPARTAMENTO"
        )
      );
      setTitulares(
        data.filter(
          (docente) => docente.rol_nombre === "PROFESOR TITULAR TIEMPO COMPLETO"
        )
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerConvocatoria = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/convocatoria-abierta`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );
      const data = await response.json();
      setConvocatoria(data[0]);
      console.log("La convocatoria es: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCrearComision = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/comision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({
          comision: comision,
          convocatoria_id: convocatoria.convocatoria_id,
          vicerrectorAcademicoGeneral: vicerrectorAcademicoGeneral,
          vicerrectorInvestigacion: vicerrectorInvestigacion,
          vicerrectorDocencia: vicerrectorDocencia,
          directorTTHH: directorTalentoHumano,
          directoresDepartamento: directoresAsignados,
          profesoresTitulares: titularesAsignados,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleObtenerUsuariosRoles();
    handleObtenerConvocatoria();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <h3 style={{ fontWeight: "bold", margin: "1rem" }}>NUEVA COMISIÓN</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <TextField
          label="Nombre de la comisión"
          variant="outlined"
          size="small"
          sx={{ margin: "0.5rem" }}
          value={comision.comision_nombre}
          onChange={(event) =>
            setComision({ ...comision, comision_nombre: event.target.value })
          }
        />
        <TextField
          label="Convocatoria"
          variant="outlined"
          size="small"
          sx={{ margin: "0.5rem" }}
          value={
            convocatoria && convocatoria.convocatoria_id
              ? convocatoria.convocatoria_id
              : ""
          }
          disabled
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            VICERRECTOR ACADÉMICO GENERAL
          </p>
          <TextField
            label="Nombre"
            variant="outlined"
            size="small"
            sx={{ margin: "0.5rem" }}
            value={
              vicerrectorAcademicoGeneral
                ? `${vicerrectorAcademicoGeneral.usuario_primernombre} ${vicerrectorAcademicoGeneral.usuario_primerapellido}`
                : ""
            }
            disabled
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            VICERRECTOR DE INVESTIGACIÓN
          </p>
          <TextField
            label="Nombre"
            variant="outlined"
            size="small"
            sx={{ margin: "0.5rem" }}
            value={
              vicerrectorInvestigacion
                ? `${vicerrectorInvestigacion.usuario_primernombre} ${vicerrectorInvestigacion.usuario_primerapellido}`
                : ""
            }
            disabled
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>
            VICERRECTOR DE DOCENCIA
          </p>
          <TextField
            label="Nombre"
            variant="outlined"
            size="small"
            sx={{ margin: "0.5rem" }}
            value={
              vicerrectorDocencia
                ? `${vicerrectorDocencia.usuario_primernombre} ${vicerrectorDocencia.usuario_primerapellido}`
                : ""
            }
            disabled
          />
        </Box>
      </Box>
      <p style={{ margin: 0, fontWeight: "bold" }}>
        DIRECTOR DE UNIDAD DE TALENTO HUMANO
      </p>
      <TextField
        label="Nombre"
        variant="outlined"
        size="small"
        sx={{ margin: "0.5rem" }}
        value={
          directorTalentoHumano
            ? `${directorTalentoHumano.usuario_primernombre} ${directorTalentoHumano.usuario_primerapellido}`
            : ""
        }
        disabled
      />
      <p style={{ fontWeight: "bold" }}>DIRECTORES DE DEPARTAMENTO</p>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "black",
          "&:hover": { backgroundColor: "rgb(50, 50, 50)" },
        }}
        onClick={handleOpenAgregarDirectorModal}
      >
        Buscar director
      </Button>
      <TableContainer
        component={Paper}
        sx={{
          width: "80%",
          maxHeight: "70vh",
          overflow: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>
                Nombre
              </TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {directoresAsignados.map((director) => (
              <TableRow key={director.usuario_id}>
                <TableCell>{`${director.usuario_primernombre} ${director.usuario_primerapellido}`}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    size="small"
                    onClick={() => {
                      setDirectoresAsignados(
                        directoresAsignados.filter(
                          (docente) =>
                            docente.usuario_id !== director.usuario_id
                        )
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{ fontWeight: "bold" }}>
        PROFESORES TITULARES A TIEMPO COMPLETO
      </p>
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "black",
          "&:hover": { backgroundColor: "rgb(50, 50, 50)" },
        }}
        onClick={handleOpenAgregarTitularModal}
      >
        Buscar titular
      </Button>
      <TableContainer
        component={Paper}
        sx={{
          width: "80%",
          maxHeight: "70vh",
          overflow: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>
                Nombre
              </TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {titularesAsignados.map((titular) => (
              <TableRow key={titular.usuario_id}>
                <TableCell>{`${titular.usuario_primernombre} ${titular.usuario_primerapellido}`}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red" }}
                    size="small"
                    onClick={() => {
                      setTitularesAsignados(
                        titularesAsignados.filter(
                          (docente) => docente.usuario_id !== titular.usuario_id
                        )
                      );
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "red",
            "&:hover": { backgroundColor: "darkred" },
            marginRight: "1rem",
          }}
          onClick={() => {
            setComision({});
            setDirectoresAsignados([]);
            setTitularesAsignados([]);
            navigate("/comision");
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
          onClick={() => {
            handleCrearComision();
          }}
        >
          Crear comisión
        </Button>
      </Box>
      <Modal
        open={openAgregarDirectorModal}
        onClose={handleCloseAgregarDirectorModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4>ASIGNAR DIRECTOR DE DEPARTAMENTO</h4>
            <Autocomplete
              options={directores}
              getOptionLabel={(option) =>
                `${option.usuario_primernombre} ${option.usuario_primerapellido}`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Directores de departamento" />
              )}
              onChange={(event, value) => setSelectedDirector(value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "darkred" },
                  marginRight: "1rem",
                }}
                onClick={() => {
                  handleCloseAgregarDirectorModal();
                  setSelectedDirector({});
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "green",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
                onClick={() => {
                  setDirectoresAsignados([
                    ...directoresAsignados,
                    selectedDirector,
                  ]);
                  handleCloseAgregarDirectorModal();
                  setSelectedDirector({});
                }}
              >
                Asignar a la comisión
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openAgregarTitularModal}
        onClose={handleCloseAgregarTitularModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h4>ASIGNAR PROFESOR TITULAR A TIEMPO COMPLETO</h4>
            <Autocomplete
              options={titulares}
              getOptionLabel={(option) =>
                `${option.usuario_primernombre} ${option.usuario_primerapellido}`
              }
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profesores titulares a tiempo completo"
                />
              )}
              onChange={(event, value) => setSelectedTitular(value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "darkred" },
                  marginRight: "1rem",
                }}
                onClick={() => {
                  handleCloseAgregarTitularModal();
                  setSelectedTitular({});
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "green",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
                onClick={() => {
                  setTitularesAsignados([
                    ...titularesAsignados,
                    selectedTitular,
                  ]);
                  handleCloseAgregarTitularModal();
                  setSelectedTitular({});
                }}
              >
                Asignar a la comisión
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default NuevaComision;
