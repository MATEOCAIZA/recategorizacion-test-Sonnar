import { Box, Button, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import config from "../config";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const NuevaConvocatoria = () => {
  const [fechaInicio, setFechaInicio] = useState(dayjs());
  const [fechaFin, setFechaFin] = useState(dayjs().add(1, "day"));
  const [error, setError] = useState("");
  const [convocatoriaArchivo, setConvocatoriaArchivo] = useState(null);
  const [convocatoriaCupos, setConvocatoriaCupos] = useState({
    principal2: 0,
    principal3: 0,
    agregado1: 0,
    agregado2: 0,
    agregado3: 0,
    auxiliar2: 0,
  });
  const [convocatoriaDescripcion, setConvocatoriaDescripcion] = useState("");

  const navigate = useNavigate();

  const handleCrearConvocatoria = async () => {
    const token = Cookies.get("token");
    const formData = new FormData();
    console.log("Convocatoria archivo: ", convocatoriaArchivo);
    formData.append("convocatoriaArchivo", convocatoriaArchivo);
    formData.append("convocatoria_descripcion", convocatoriaDescripcion);
    formData.append("fecha_inicio", fechaInicio);
    formData.append("fecha_fin", fechaFin);
    formData.append("principal2", convocatoriaCupos.principal2);
    formData.append("principal3", convocatoriaCupos.principal3);
    formData.append("agregado1", convocatoriaCupos.agregado1);
    formData.append("agregado2", convocatoriaCupos.agregado2);
    formData.append("agregado3", convocatoriaCupos.agregado3);
    formData.append("auxiliar2", convocatoriaCupos.auxiliar2);

    try {
      const response = await fetch(`${config.apiBaseUrl}/convocatoria`, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });
      if (response.ok) {
        toast.success("Convocatoria creada correctamente");
        navigate("/convocatoria");
      } else {
        toast.error("Error al crear la convocatoria. Puede que ya exista una convocatoria vigente.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFechaInicioChange = (newValue) => {
    setFechaInicio(newValue);
    if (newValue.isAfter(fechaFin)) {
      setFechaFin(newValue);
    }
  };

  const handleFechaFinChange = (newValue) => {
    if (newValue.isBefore(fechaInicio)) {
      setError("La fecha de fin no puede ser menor que la fecha de inicio");
    } else {
      setError("");
      setFechaFin(newValue);
    }
  };

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
      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, marginBottom: "1rem" }}>
        Creación de la convocatoria
      </Typography>
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Fecha de inicio"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            format="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "25%" }} />
            )}
            name="fecha_inicio"
            sx={{ mr: 2 }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Fecha de fin"
            value={fechaFin}
            onChange={handleFechaFinChange}
            format="DD/MM/YYYY"
            shouldDisableDate={(date) => date.isBefore(fechaInicio)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: "25%" }}
                error={!!error}
                helperText={error}
              />
            )}
            name="fecha_fin"
          />
        </LocalizationProvider>
      </Box>
      <TextField
        label="Archivo de convocatoria"
        type="file"
        InputLabelProps={{ shrink: true }}
        sx={{ width: "50%", marginBottom: "1rem" }}
        size="small"
        name="convocatoriaArchivo"
        onChange={(e) => setConvocatoriaArchivo(e.target.files
          ? e.target.files[0]
          : null)}
      />
      <TextField
        label="Descripción de la convocatoria"
        multiline
        rows={4}
        InputLabelProps={{ shrink: true }}
        sx={{ width: "50%", marginBottom: "1rem" }}
        size="small"
        name="convocatoriaDescripcion"
        onChange={(e) => setConvocatoriaDescripcion(e.target
          ? e.target.value
          : "")}
      />
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
        Asignación de cupos
      </Typography>
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
          label="Cupos para AUXILIAR 2"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%", marginRight: "1rem" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, auxiliar2: e.target.value })}
        />
        <TextField
          label="Cupos para AGREGADO 1"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%", marginRight: "1rem" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, agregado1: e.target.value })}
        />
        <TextField
          label="Cupos para AGREGADO 2"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, agregado2: e.target.value })}
        />
        
        
      </Box>
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
          label="Cupos para AGREGADO 3"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%", marginRight: "1rem" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, agregado3: e.target.value })}
        />
        <TextField
          label="Cupos para PRINCIPAL 2"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%", marginRight: "1rem" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, principal2: e.target.value })}
        />
        <TextField
          label="Cupos para PRINCIPAL 3"
          type="number"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: 0 }}
          sx={{ width: "25%" }}
          size="small"
          onChange={(e) => setConvocatoriaCupos({ ...convocatoriaCupos, principal3: e.target.value })}
        />
      </Box>
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
          style={{ marginRight: "1rem", backgroundColor: "red" }}
          size="small"
          onClick={() => navigate("/convocatoria")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "rgb(0, 113, 121)" }}
          size="small"
          onClick={handleCrearConvocatoria}
        >
          Crear convocatoria
        </Button>
      </Box>
    </Box>
  );
};

export default NuevaConvocatoria;