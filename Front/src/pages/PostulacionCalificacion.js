import {
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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import config from "../config";
import dayjs from "dayjs";

const PostulacionCalificacion = () => {
  const { id } = useParams();
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [postulacion, setPostulacion] = useState({});
  const [adicionales, setAdicionales] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [certificadosIdioma, setCertificadosIdioma] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [investigaciones, setInvestigaciones] = useState([]);
  const [grupoTesis, setGrupoTesis] = useState([]);
  const [ponencias, setPonencias] = useState([]);

  const [openCalificarAdicionalModal, setOpenCalificarAdicionalModal] =
    useState(false);

  const navigate = useNavigate();

  const handleOpenCalificarAdicionalModal = (actividad) => {
    setActividadSeleccionada(actividad);
    setOpenCalificarAdicionalModal(true);
  };

  const handleCloseCalificarAdicionalModal = () => {
    setOpenCalificarAdicionalModal(false);
  };

  const handleObtenerPostulacion = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/postulaciones/${id}`, {
        method: "GET",
        headers: { token: Cookies.get("token") },
      });
      const data = await response.json();
      setPostulacion(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerArticulosPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/articulos/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setArticulos(data);
      console.log("Los articulos son: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerCapacitacionesPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/capacitaciones/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setCapacitaciones(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerTesisPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/tesis/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setGrupoTesis(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerInvestigacionesPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/investigaciones/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setInvestigaciones(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerPonenciasPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/ponencias/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setPonencias(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerAdicionalesPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/adicionales/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setAdicionales(data);
      } else {
        setAdicionales([]);
      }
      console.log("Los adicionales son: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerEvaluacionPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/evaluaciones/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setEvaluaciones(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerCertificadosIdiomaPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/certificadosidioma/${postulacion.usuario_id}/${id}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setCertificadosIdioma(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleObtenerPostulacion();
  }, [id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerArticulosPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerCapacitacionesPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerTesisPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerInvestigacionesPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerPonenciasPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerAdicionalesPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerEvaluacionPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  useEffect(() => {
    if (postulacion.usuario_id) {
      handleObtenerCertificadosIdiomaPorUsuario(postulacion.usuario_id);
    }
  }, [postulacion.usuario_id]);

  const handleUpdateArticuloEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/articulo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ articulo_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Artículo aprobado.");
        handleObtenerArticulosPorUsuario();
      } else {
        alert("No se pudo aprobar el artículo.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCapacitacionEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/capacitacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ capacitacion_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Capacitación aprobada.");
        handleObtenerCapacitacionesPorUsuario();
      } else {
        alert("No se pudo aprobar la capacitación.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTesisEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/tesis/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ tesis_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Tesis aprobada.");
        handleObtenerTesisPorUsuario();
      } else {
        alert("No se pudo aprobar la tesis.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateInvestigacionEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/investigacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ investigacion_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Investigación aprobada.");
        handleObtenerInvestigacionesPorUsuario();
      } else {
        alert("No se pudo aprobar la investigación.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePonenciaEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/ponencia/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ ponencia_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Ponencia aprobada.");
        handleObtenerPonenciasPorUsuario();
      } else {
        alert("No se pudo aprobar la ponencia.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAdicionalEstado = async (id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/adicional/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({
          adicional_puntaje: actividadSeleccionada.adicional_puntaje,
          adicional_comentario: actividadSeleccionada.adicional_comentario,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Actividad adicional aprobada.");
        handleObtenerAdicionalesPorUsuario();
      } else {
        alert("No se pudo aprobar la actividad adicional.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEvaluacionEstado = async (id, estado) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/evaluacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        body: JSON.stringify({ evaluacion_estado: estado }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Evaluación aprobada.");
        handleObtenerEvaluacionPorUsuario();
      } else {
        alert("No se pudo aprobar la evaluación.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCertificadoIdiomaEstado = async (id, estado) => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/certificadoidioma/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
          body: JSON.stringify({ idioma_estado: estado }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Certificado de idioma aprobado.");
        handleObtenerCertificadosIdiomaPorUsuario();
      } else {
        alert("No se pudo aprobar el certificado de idioma.");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAprobarPostulacion = async () => {
    let total = 0;
    if (adicionales.length > 0) {
      for (const adicional of adicionales) {
        total += parseFloat(adicional.adicional_puntaje);
      }
    }
    const result = await fetch(`${config.apiBaseUrl}/postulacion/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify({ 
        postulacion_calificacion: total, 
        postulacion_estado: "APROBADO" }),
    });

    if (result.ok) {
      alert("Postulación aprobada.");
      navigate("/calificacion");
    } else {
      alert("No se pudo aprobar la postulación.");
    }
    console.log(total);
  };

  const handleRechazarPostulacion = async () => {
    let total = 0;
    const result = await fetch(`${config.apiBaseUrl}/postulacion/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify({ 
        postulacion_calificacion: total, 
        postulacion_estado: "RECHAZADO" }),
    });

    if (result.ok) {
      alert("Postulación actualizada correctamente.");
      navigate("/calificacion");
    } else {
      alert("No se pudo aprobar la postulación.");
    }
    console.log(total);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: "1rem" }}>Postulación</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          borderRadius: "1rem",
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "90%",
            borderRadius: "1rem",
            overflowX: "auto",
          }}
        >
          <h4 style={{ marginBottom: "1rem" }}>
            Artículos en revistas indexadas u obras de relevancia
          </h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Revista
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha de postulación
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Link
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.map((row) => (
                  <TableRow key={row.articulo_id}>
                    <TableCell>{row.articulo_titulo}</TableCell>
                    <TableCell>{row.articulo_nombrerevista}</TableCell>
                    <TableCell>
                      {dayjs(row.articulo_fechapublicacion).format(
                        "DD-MM-YYYY"
                      )}
                    </TableCell>
                    <TableCell>
                      <a
                        href={row.articulo_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Link
                      </a>
                    </TableCell>
                    <TableCell>
                      {row.articulo_estado === true
                        ? "APROBADO"
                        : row.articulo_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.articulo_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver artículo
                        </Button>
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
                            handleUpdateArticuloEstado(row.articulo_id, 1)
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateArticuloEstado(row.articulo_id, 0)
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>
            Evaluación de desempeño docente
          </h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Porcentaje
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {evaluaciones.map((row) => (
                  <TableRow key={row.ced_id}>
                    <TableCell>{row.ced_porcentaje}</TableCell>
                    <TableCell>
                      {row.ced_estado === true
                        ? "APROBADO"
                        : row.ced_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.ced_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver evaluación
                        </Button>
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
                            handleUpdateEvaluacionEstado(row.ced_id, 1)
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateEvaluacionEstado(row.ced_id, 0)
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>Certificado de idioma</h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nivel
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificadosIdioma.map((row) => (
                  <TableRow key={row.idioma_id}>
                    <TableCell>{row.idioma_nivel}</TableCell>
                    <TableCell>
                      {row.idioma_estado === true
                        ? "APROBADO"
                        : row.idioma_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.idioma_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver certificado
                        </Button>
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
                            handleUpdateCertificadoIdiomaEstado(
                              row.idioma_id,
                              1
                            )
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateCertificadoIdiomaEstado(
                              row.idioma_id,
                              0
                            )
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>
            Capacitaciones y cursos de formación
          </h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha del evento
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {capacitaciones.map((row) => (
                  <TableRow key={row.capacitacion_id}>
                    <TableCell>{row.capacitacion_nombreevento}</TableCell>
                    <TableCell>
                      {dayjs(row.capacitacion_fechaevento).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {row.capacitacion_estado === true
                        ? "APROBADO"
                        : row.capacitacion_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.capacitacion_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver capacitación
                        </Button>
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
                            handleUpdateCapacitacionEstado(
                              row.capacitacion_id,
                              1
                            )
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateCapacitacionEstado(
                              row.capacitacion_id,
                              0
                            )
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>Tesis dirigidas</h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha de publicación
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grupoTesis.map((row) => (
                  <TableRow key={row.tesis_id}>
                    <TableCell>{row.tesis_titulo}</TableCell>
                    <TableCell>
                      {dayjs(row.tesis_fechapublicacion).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {row.tesis_estado === true
                        ? "ACEPTADO"
                        : row.tesis_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.tesis_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver tesis
                        </Button>
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
                            handleUpdateTesisEstado(row.tesis_id, 1)
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateTesisEstado(row.tesis_id, 0)
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>Investigaciones</h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha de inicio
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha de fin
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investigaciones.map((row) => (
                  <TableRow key={row.investigacion_id}>
                    <TableCell>{row.investigacion_titulo}</TableCell>
                    <TableCell>
                      {dayjs(row.investigacion_fechainicio).format(
                        "DD-MM-YYYY"
                      )}
                    </TableCell>
                    <TableCell>
                      {dayjs(row.investigacion_fechafin).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {row.investigacion_estado === true
                        ? "APROBADO"
                        : row.investigacion_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.investigacion_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver investigación
                        </Button>
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
                            handleUpdateInvestigacionEstado(
                              row.investigacion_id,
                              1
                            )
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdateInvestigacionEstado(
                              row.investigacion_id,
                              0
                            )
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ marginBottom: "1rem" }}>Ponencias</h4>
          <TableContainer
            component={Paper}
            sx={{
              marginBottom: "1rem",
              width: "80%",
              overflowX: "auto",
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Nombre
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Fecha del evento
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Estado
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ponencias.map((row) => (
                  <TableRow key={row.ponencia_id}>
                    <TableCell>{row.ponencia_nombre}</TableCell>
                    <TableCell>
                      {dayjs(row.ponencia_fecha).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {row.ponencia_estado === true
                        ? "APROBADO"
                        : row.ponencia_estado === false
                        ? "RECHAZADO"
                        : "PENDIENTE"}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            marginRight: "1rem",
                            backgroundColor: "gray",
                            "&:hover": {
                              backgroundColor: "rgb(204, 204, 204)",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `${config.apiBaseUrl}/${row.ponencia_ubicacion}`,
                              "_blank"
                            )
                          }
                        >
                          Ver ponencia
                        </Button>
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
                            handleUpdatePonenciaEstado(row.ponencia_id, 1)
                          }
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "darkred",
                            },
                          }}
                          onClick={() =>
                            handleUpdatePonenciaEstado(row.ponencia_id, 0)
                          }
                        >
                          Rechazar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {adicionales.length > 0 && (
            <>
              <h4 style={{ marginBottom: "1rem" }}>
                Actividades para puntaje adicional
              </h4>
              <TableContainer
                component={Paper}
                sx={{
                  marginBottom: "1rem",
                  width: "80%",
                  overflowX: "auto",
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                        Criterio
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                        Puntaje asignado
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                        Comentario
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                        Estado
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "rgb(204, 204, 204)" }}>
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adicionales.map((row) => (
                      <TableRow key={row.adicional_id}>
                        <TableCell>{row.adicional_criterio}</TableCell>
                        <TableCell>
                          {row.adicional_puntaje
                            ? row.adicional_puntaje
                            : "Pendiente"}
                        </TableCell>
                        <TableCell>
                          {row.adicional_comentario
                            ? row.adicional_comentario
                            : "Sin comentario"}
                        </TableCell>
                        <TableCell>
                          {row.adicional_estado === true
                            ? "APROBADO"
                            : row.adicional_estado === false
                            ? "RECHAZADO"
                            : "PENDIENTE"}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                marginRight: "1rem",
                                backgroundColor: "gray",
                                "&:hover": {
                                  backgroundColor: "rgb(204, 204, 204)",
                                },
                              }}
                              onClick={() =>
                                window.open(
                                  `${config.apiBaseUrl}/${row.adicional_ubicacion}`,
                                  "_blank"
                                )
                              }
                            >
                              Ver actividad
                            </Button>
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
                              onClick={() => {
                                handleOpenCalificarAdicionalModal(row);
                              }}
                            >
                              Calificar
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              width: "80%",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginRight: "1rem",
                backgroundColor: "gray",
                "&:hover": {
                  backgroundColor: "rgb(204, 204, 204)",
                },
              }}
              size="small"
            >
              Regresar
            </Button>
            <Button
              variant="contained"
              sx={{
                marginRight: "1rem",
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
              size="small"
              onClick={handleRechazarPostulacion}
            >
              Rechazar postulación
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(0, 113, 121)",
                "&:hover": {
                  backgroundColor: "rgb(7, 83, 88)",
                },
              }}
              size="small"
              onClick={handleAprobarPostulacion}
            >
              Aprobar postulación
            </Button>
          </Box>
        </Box>
      </Box>
      <Modal
        open={openCalificarAdicionalModal}
        onClose={handleCloseCalificarAdicionalModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowX: "auto",
          }}
        >
          {actividadSeleccionada && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>Calificar Actividad</h4>
                <p>
                  <span style={{ fontWeight: "bold" }}>Criterio:</span>{" "}
                  {actividadSeleccionada.adicional_criterio}
                </p>
                <TextField
                  label="Asignar puntaje"
                  type="number"
                  sx={{ marginBottom: "1rem", width: "50%" }}
                  onChange={(e, value) => {
                    setActividadSeleccionada({
                      ...actividadSeleccionada,
                      adicional_puntaje: e.target.value,
                    });
                  }}
                  value={actividadSeleccionada?.adicional_puntaje}
                  size="small"
                  inputProps={{ min: 0, max: 100 }}
                />
                <TextField
                  label="Comentario"
                  sx={{ marginBottom: "1rem", width: "50%" }}
                  onChange={(e) => {
                    setActividadSeleccionada({
                      ...actividadSeleccionada,
                      adicional_comentario: e.target.value,
                    });
                  }}
                  value={actividadSeleccionada?.adicional_comentario}
                  size="small"
                  multiline
                  rows={3}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleCloseCalificarAdicionalModal}
                    sx={{
                      marginRight: "1rem",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                    size="small"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleUpdateAdicionalEstado(
                        actividadSeleccionada.adicional_id
                      );
                      handleCloseCalificarAdicionalModal();
                      handleObtenerAdicionalesPorUsuario();
                    }}
                    sx={{
                      marginRight: "1rem",
                      backgroundColor: "rgb(0, 113, 121)",
                      "&:hover": {
                        backgroundColor: "rgb(7, 83, 88)",
                      },
                    }}
                    size="small"
                  >
                    Calificar
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PostulacionCalificacion;
