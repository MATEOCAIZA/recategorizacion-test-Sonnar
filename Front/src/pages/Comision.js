import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import config from "../config";
import { useNavigate } from "react-router-dom";

const Comision = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [comision, setComision] = useState({});
  const [comisiones, setComisiones] = useState([]);
  const [selectedComision, setSelectedComision] = useState(null);

  const navigate = useNavigate();

  const handleObtenerComisiones = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/comisiones`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComisiones(data);
        console.log(data);
      } else {
        console.error('Error al obtener las comisiones:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener las comisiones:', error);
    }
  };

  const handleObtenerComision = async (id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/comision/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComision(data);
        console.log(data);
      } else {
        console.error('Error al obtener la comisión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener la comisión:', error);
    }
  };

  useEffect(() => {
    handleObtenerComisiones();
  }, []);

  const vicerrectorAcademicoGeneral = comision.integrantes?.find(
    (integrante) => integrante.rol_nombre === "VICERRECTOR ACADEMICO GENERAL"
  );

  const vicerrectorInvestigacion = comision.integrantes?.find(
    (integrante) => integrante.rol_nombre === "VICERRECTOR DE INVESTIGACION"
  );

  const vicerrectorDocencia = comision.integrantes?.find(
    (integrante) => integrante.rol_nombre === "VICERRECTOR DE DOCENCIA"
  );

  const directorTTHH = comision.integrantes?.find(
    (integrante) => integrante.rol_nombre === "DIRECTOR DE UNIDAD DE TTHH"
  );

  const directoresDepartamento = comision.integrantes?.filter(
    (integrante) => integrante.rol_nombre === "DIRECTOR DE DEPARTAMENTO"
  ) || [];

  const profesoresTitulares = comision.integrantes?.filter(
    (integrante) =>
      integrante.rol_nombre === "PROFESOR TITULAR TIEMPO COMPLETO" &&
      !directoresDepartamento.some(
        (director) => director.usuario_id === integrante.usuario_id
      )
  ) || [];

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
      <h3 style={{ fontWeight: "bold", margin: "1rem" }}>COMISIÓN</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Autocomplete
          options={comisiones}
          getOptionLabel={(option) => option.comision_nombre}
          style={{ width: 300, marginRight: "1rem" }}
          size="small"
          renderInput={(params) => <TextField {...params} label="Comisión" />}
          onChange={(event, value) => {
            if (value) {
              setSelectedComision(value);
              handleObtenerComision(value.comision_id);
              console.log(value);
            } else {
              setSelectedComision(null);
            }
          }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "black",
            "&:hover": { backgroundColor: "rgb(50, 50, 50)" },
          }}
          onClick={() => navigate("/nuevacomision")}
        >
          Crear comisión
        </Button>
      </Box>
      {selectedComision && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <h4 style={{ fontWeight: "bold" }}>{selectedComision.comision_nombre}</h4>
          <h5 style={{ fontWeight: "bold" }}>Integrantes</h5>
          <h6>VICERRECTOR ACADÉMICO GENERAL</h6>
          {vicerrectorAcademicoGeneral ? (
            <p>
              {vicerrectorAcademicoGeneral.usuario_primernombre} {vicerrectorAcademicoGeneral.usuario_segundonombre} {vicerrectorAcademicoGeneral.usuario_primerapellido} {vicerrectorAcademicoGeneral.usuario_segundoapellido}
            </p>
          ) : (
            <p>No hay un Vicerrector Académico General en esta comisión.</p>
          )}
          <h6>VICERRECTOR DE INVESTIGACIÓN</h6>
          {vicerrectorInvestigacion ? (
            <p>
              {vicerrectorInvestigacion.usuario_primernombre} {vicerrectorInvestigacion.usuario_segundonombre} {vicerrectorInvestigacion.usuario_primerapellido} {vicerrectorInvestigacion.usuario_segundoapellido}
            </p>
          ) : (
            <p>No hay un Vicerrector de Investigación en esta comisión.</p>
          )}
          <h6>VICERRECTOR DE DOCENCIA</h6>
          {vicerrectorDocencia ? (
            <p>
              {vicerrectorDocencia.usuario_primernombre} {vicerrectorDocencia.usuario_segundonombre} {vicerrectorDocencia.usuario_primerapellido} {vicerrectorDocencia.usuario_segundoapellido}
            </p>
          ) : (
            <p>No hay un Vicerrector de Docencia en esta comisión.</p>
          )}
          <h6>DIRECTOR DE UNIDAD DE TTHH</h6>
          {directorTTHH ? (
            <p>
              {directorTTHH.usuario_primernombre} {directorTTHH.usuario_segundonombre} {directorTTHH.usuario_primerapellido} {directorTTHH.usuario_segundoapellido}
            </p>
          ) : (
            <p>No hay un Director de Unidad de TTHH en esta comisión.</p>
          )}
          <h6>DIRECTORES DE DEPARTAMENTO</h6>
          {directoresDepartamento.length > 0 ? (
            directoresDepartamento.map((director) => (
              <p>
                {director.usuario_primernombre} {director.usuario_segundonombre} {director.usuario_primerapellido} {director.usuario_segundoapellido}
              </p>
            ))
          ) : (
            <p>No hay Directores de Departamento en esta comisión.</p>
          )}
          <h6>PROFESORES TITULARES TIEMPO COMPLETO</h6>
          {profesoresTitulares.length > 0 ? (
            profesoresTitulares.map((profesor) => (
              <p>
                {profesor.usuario_primernombre} {profesor.usuario_segundonombre} {profesor.usuario_primerapellido} {profesor.usuario_segundoapellido}
              </p>
            ))
          ) : (
            <p
              style={{
                marginBottom: "1rem",
              }}
            >
            </p>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Comision;