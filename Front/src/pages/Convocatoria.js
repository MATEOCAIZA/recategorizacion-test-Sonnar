import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Convocatoria = () => {
  const [convocatorias, setConvocatorias] = useState([]);

  const navigate = useNavigate();

  const handleCargarConvocatorias = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/convocatorias`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setConvocatorias(data);
        console.log(data);
      } else {
        console.error("Error al cargar las convocatorias");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCargarConvocatorias();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mxHeight: "calc(100% - 6rem)", // Ajusta la altura restando la altura del Navbar
        width: "100%", // Ajusta el margen superior para evitar superposición
      }}
    >
      <h1 style={{ marginTop: "1rem" }}>Convocatoria</h1>
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
          style={{ marginTop: "1rem", backgroundColor: "rgb(0, 113, 121)" }}
          size="small"
          onClick={() => navigate("/nuevaconvocatoria")}
        >
          Crear nueva convocatoria
        </Button>
      </Box>
      <h3>Lista de convocatorias</h3>
      <TableContainer
        component={Paper}
        sx={{
          width: "80%",
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>Convocatoria ID</TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>Fecha de inicio</TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>Fecha de fin</TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>Estado</TableCell>
              <TableCell style={{ backgroundColor: "rgb(206, 206, 206)" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {convocatorias.map((convocatoria) => (
              <TableRow key={convocatoria.convocatoria_id}>
                <TableCell>{convocatoria.convocatoria_id}</TableCell>
                <TableCell>
                  {dayjs(convocatoria.fecha_inicio).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {dayjs(convocatoria.fecha_fin).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{convocatoria.estado}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "rgb(0, 113, 121)" }}
                    onClick={() => window.open(
                      `${config.apiBaseUrl}/${convocatoria.convocatoria_ubicacion}`,
                      "_blank"
                    )}
                  >
                    Ver archivo adjunto
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Convocatoria;
