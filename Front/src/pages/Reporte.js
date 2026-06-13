import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import config from "../config";

const Reporte = () => {
  const [postulacionesAuxiliar1, setPostulacionesAuxiliar1] = useState([]);
  const [postulacionesAuxiliar2, setPostulacionesAuxiliar2] = useState([]);
  const [postulacionesAgregado1, setPostulacionesAgregado1] = useState([]);
  const [postulacionesAgregado2, setPostulacionesAgregado2] = useState([]);
  const [postulacionesPrincipal1, setPostulacionesPrincipal1] = useState([]);
  const [postulacionesPrincipal2, setPostulacionesPrincipal2] = useState([]);
  const [cupos, setCupos] = useState([]);

  const cupoAuxiliar1 = cupos.find((cupo) => cupo.grado_id == 6);
  const cupoAuxiliar2 = cupos.find((cupo) => cupo.grado_id == 3);
  const cupoAgregado1 = cupos.find((cupo) => cupo.grado_id == 4);
  const cupoAgregado2 = cupos.find((cupo) => cupo.grado_id == 8);
  const cupoPrincipal1 = cupos.find((cupo) => cupo.grado_id == 2);
  const cupoPrincipal2 = cupos.find((cupo) => cupo.grado_id == 7);
  const totalCuposDisponiblesAuxiliar1 = cupoAuxiliar1 ? cupoAuxiliar1.cupo : 0;
  const totalCuposDisponiblesAuxiliar2 = cupoAuxiliar2 ? cupoAuxiliar2.cupo : 0;
  const totalCuposDisponiblesAgregado1 = cupoAgregado1 ? cupoAgregado1.cupo : 0;
  const totalCuposDisponiblesAgregado2 = cupoAgregado2 ? cupoAgregado2.cupo : 0;
  const totalCuposDisponiblesPrincipal1 = cupoPrincipal1
    ? cupoPrincipal1.cupo
    : 0;
  const totalCuposDisponiblesPrincipal2 = cupoPrincipal2
    ? cupoPrincipal2.cupo
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePostulacionesAuxiliar1 = await fetch(
          `${config.apiBaseUrl}/postulaciones-auxiliar1`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesAuxiliar1 =
          await responsePostulacionesAuxiliar1.json();
        setPostulacionesAuxiliar1(
          Array.isArray(dataPostulacionesAuxiliar1)
            ? dataPostulacionesAuxiliar1
            : []
        );
        console.log(dataPostulacionesAuxiliar1);

        const responsePostulacionesAuxiliar2 = await fetch(
          `${config.apiBaseUrl}/postulaciones-auxiliar2`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesAuxiliar2 =
          await responsePostulacionesAuxiliar2.json();
        setPostulacionesAuxiliar2(
          Array.isArray(dataPostulacionesAuxiliar2)
            ? dataPostulacionesAuxiliar2
            : []
        );
        console.log(dataPostulacionesAuxiliar2);

        const responsePostulacionesAgregado1 = await fetch(
          `${config.apiBaseUrl}/postulaciones-agregado1`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesAgregado1 =
          await responsePostulacionesAgregado1.json();
        setPostulacionesAgregado1(
          Array.isArray(dataPostulacionesAgregado1)
            ? dataPostulacionesAgregado1
            : []
        );
        console.log(dataPostulacionesAgregado1);

        const responsePostulacionesAgregado2 = await fetch(
          `${config.apiBaseUrl}/postulaciones-agregado2`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesAgregado2 =
          await responsePostulacionesAgregado2.json();
        setPostulacionesAgregado2(
          Array.isArray(dataPostulacionesAgregado2)
            ? dataPostulacionesAgregado2
            : []
        );
        console.log(dataPostulacionesAgregado2);

        const responsePostulacionesPrincipal1 = await fetch(
          `${config.apiBaseUrl}/postulaciones-principal1`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesPrincipal1 =
          await responsePostulacionesPrincipal1.json();
        setPostulacionesPrincipal1(
          Array.isArray(dataPostulacionesPrincipal1)
            ? dataPostulacionesPrincipal1
            : []
        );
        console.log(dataPostulacionesPrincipal1);

        const responsePostulacionesPrincipal2 = await fetch(
          `${config.apiBaseUrl}/postulaciones-principal2`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataPostulacionesPrincipal2 =
          await responsePostulacionesPrincipal2.json();
        setPostulacionesPrincipal2(
          Array.isArray(dataPostulacionesPrincipal2)
            ? dataPostulacionesPrincipal2
            : []
        );
        console.log(dataPostulacionesPrincipal2);

        const responseCupos = await fetch(
          `${config.apiBaseUrl}/convocatorias_grados`,
          {
            method: "GET",
            headers: { token: Cookies.get("token") },
          }
        );
        const dataCupos = await responseCupos.json();
        setCupos(Array.isArray(dataCupos) ? dataCupos : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Filtrar postulaciones por estado
  const postulacionesAprobadasAuxiliar1 = postulacionesAuxiliar1.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasAuxiliar1 = postulacionesAuxiliar1.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );
  const postulacionesAprobadasAuxiliar2 = postulacionesAuxiliar2.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasAuxiliar2 = postulacionesAuxiliar2.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );
  const postulacionesAprobadasAgregado1 = postulacionesAgregado1.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasAgregado1 = postulacionesAgregado1.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );
  const postulacionesAprobadasAgregado2 = postulacionesAgregado2.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasAgregado2 = postulacionesAgregado2.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );
  const postulacionesAprobadasPrincipal1 = postulacionesPrincipal1.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasPrincipal1 = postulacionesPrincipal1.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );
  const postulacionesAprobadasPrincipal2 = postulacionesPrincipal2.filter(
    (p) => p.postulacion_estado === "APROBADO"
  );
  const postulacionesRechazadasPrincipal2 = postulacionesPrincipal2.filter(
    (p) => p.postulacion_estado === "RECHAZADO"
  );

  // Ordenar las aprobadas por calificación de mayor a menor
  const aprobadasOrdenadasAuxiliar1 = [...postulacionesAprobadasAuxiliar1].sort(
    (a, b) => b.postulacion_calificacion - a.postulacion_calificacion
  );
  const aprobadasOrdenadasAuxiliar2 = [...postulacionesAprobadasAuxiliar2].sort(
    (a, b) => b.postulacion_calificacion - a.postulacion_calificacion
  );
  const aprobadasOrdenadasAgregado1 = [...postulacionesAprobadasAgregado1].sort(
    (a, b) => b.postulacion_calificacion - a.postulacion_calificacion
  );
  const aprobadasOrdenadasAgregado2 = [...postulacionesAprobadasAgregado2].sort(
    (a, b) => b.postulacion_calificacion - a.postulacion_calificacion
  );
  const aprobadasOrdenadasPrincipal1 = [
    ...postulacionesAprobadasPrincipal1,
  ].sort((a, b) => b.postulacion_calificacion - a.postulacion_calificacion);
  const aprobadasOrdenadasPrincipal2 = [
    ...postulacionesAprobadasPrincipal2,
  ].sort((a, b) => b.postulacion_calificacion - a.postulacion_calificacion);

  // Dividir aprobadas en "con cupo" y "sin cupo"
  const postulacionesConCupoAuxiliar1 = aprobadasOrdenadasAuxiliar1.slice(
    0,
    totalCuposDisponiblesAuxiliar1
  );
  const postulacionesSinCupoAuxiliar1 = aprobadasOrdenadasAuxiliar1.slice(
    totalCuposDisponiblesAuxiliar1
  );
  const postulacionesConCupoAuxiliar2 = aprobadasOrdenadasAuxiliar2.slice(
    0,
    totalCuposDisponiblesAuxiliar2
  );
  const postulacionesSinCupoAuxiliar2 = aprobadasOrdenadasAuxiliar2.slice(
    totalCuposDisponiblesAuxiliar2
  );
  const postulacionesConCupoAgregado1 = aprobadasOrdenadasAgregado1.slice(
    0,
    totalCuposDisponiblesAgregado1
  );
  const postulacionesSinCupoAgregado1 = aprobadasOrdenadasAgregado1.slice(
    totalCuposDisponiblesAgregado1
  );
  const postulacionesConCupoAgregado2 = aprobadasOrdenadasAgregado2.slice(
    0,
    totalCuposDisponiblesAgregado2
  );
  const postulacionesSinCupoAgregado2 = aprobadasOrdenadasAgregado2.slice(
    totalCuposDisponiblesAgregado2
  );
  const postulacionesConCupoPrincipal1 = aprobadasOrdenadasPrincipal1.slice(
    0,
    totalCuposDisponiblesPrincipal1
  );
  const postulacionesSinCupoPrincipal1 = aprobadasOrdenadasPrincipal1.slice(
    totalCuposDisponiblesPrincipal1
  );
  const postulacionesConCupoPrincipal2 = aprobadasOrdenadasPrincipal2.slice(
    0,
    totalCuposDisponiblesPrincipal2
  );
  const postulacionesSinCupoPrincipal2 = aprobadasOrdenadasPrincipal2.slice(
    totalCuposDisponiblesPrincipal2
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h3 style={{ margin: "1rem" }}>Reporte de Recomendación de Postulaciones</h3>

      {postulacionesAuxiliar1.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Auxiliar 1:{" "}
            {totalCuposDisponiblesAuxiliar1}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Auxiliar 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoAuxiliar1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Auxiliar 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoAuxiliar1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Auxiliar 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasAuxiliar1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {postulacionesAuxiliar2.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Auxiliar 2:{" "}
            {totalCuposDisponiblesAuxiliar2}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Auxiliar 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoAuxiliar2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Auxiliar 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoAuxiliar2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Auxiliar 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasAuxiliar2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {postulacionesAgregado1.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Agregado 1:{" "}
            {totalCuposDisponiblesAgregado1}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Agregado 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoAgregado1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Agregado 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoAgregado1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Agregado 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasAgregado1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {postulacionesAgregado2.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Agregado 2:{" "}
            {totalCuposDisponiblesAgregado2}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Agregado 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoAgregado2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Agregado 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoAgregado2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Agregado 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasAgregado2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {postulacionesPrincipal1.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Principal 1:{" "}
            {totalCuposDisponiblesPrincipal1}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Principal 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoPrincipal1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Principal 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoPrincipal1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Principal 1</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasPrincipal1.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {postulacionesPrincipal2.length > 0 && (
        <Box sx={{ width: "90%" }}>
          <h4>
            Total de Cupos Disponibles para Principal 2:{" "}
            {totalCuposDisponiblesPrincipal2}
          </h4>

          {/* Tabla de Postulaciones Aprobadas con Cupo */}
          <h4>Postulaciones Aprobadas con Cupo para Principal 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesConCupoPrincipal2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Aprobadas Sin Cupo */}
          <h4>Postulaciones Aprobadas Sin Cupo para Principal 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesSinCupoPrincipal2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Tabla de Postulaciones Rechazadas */}
          <h4>Postulaciones Rechazadas para Principal 2</h4>
          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Nombre</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Cédula</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Estado</TableCell>
                  <TableCell style={{ backgroundColor: "rgb(204, 204, 204)" }}>Calificación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulacionesRechazadasPrincipal2.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{`${p.usuario_primernombre} ${p.usuario_primerapellido}`}</TableCell>
                    <TableCell>{p.usuario_cedula}</TableCell>
                    <TableCell>{p.postulacion_estado}</TableCell>
                    <TableCell>{p.postulacion_calificacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Reporte;
