import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  clockPointerClasses,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import config from "../config";
import dayjs from "dayjs";
import { validarDOI, validarISSN } from "../utils/validation";
const Postulacion = () => {
  const [openAgregarAdicional, setOpenAgregarAdicional] = useState(false);
  const [openAgregarArticulo, setOpenAgregarArticulo] = useState(false);
  const [openAgregarCapacitacion, setOpenAgregarCapacitacion] = useState(false);
  const [openAgregarTesis, setOpenAgregarTesis] = useState(false);
  const [openAgregarInvestigacion, setOpenAgregarInvestigacion] =
    useState(false);
  const [openAgregarPonencia, setOpenAgregarPonencia] = useState(false);
  const [openAgregarGestionEducativa, setOpenAgregarGestionEducativa] =
    useState(false);
  const [actividadesAdicionales, setActividadesAdicionales] = useState([]);
  const [actividad, setActividad] = useState({});
  const [articulos, setArticulos] = useState([]);
  const [articulo, setArticulo] = useState({});
  const [capacitacion, setCapacitacion] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [tesis, setTesis] = useState(false);
  const [grupoTesis, setGrupoTesis] = useState([]);
  const [investigacion, setInvestigacion] = useState(false);
  const [investigaciones, setInvestigaciones] = useState([]);
  const [ponencia, setPonencia] = useState(false);
  const [ponencias, setPonencias] = useState([]);
  const [gestionEducativa, setGestionEducativa] = useState(false);
  const [gestionesEducativas, setGestionesEducativas] = useState([]);
  const [certificadoEvaluacionDocente, setCertificadoEvaluacionDocente] =
    useState(null);
    const [archivoCertificadoEvaluacionDocente, setArchivoCertificadoEvaluacionDocente] = useState(null);
  const [facilitadorCES, setFacilitadorCES] = useState(false);
  const [archivoFacilitadorCES, setArchivoFacilitadorCES] = useState(null);
  const [facilitadorQA, setFacilitadorQA] = useState(false);
  const [archivoFacilitadorQA, setArchivoFacilitadorQA] = useState(null);
  const [parExterno, setParExterno] = useState(false);
  const [parExternoTipo, setParExternoTipo] = useState("");
  const [archivoParExterno, setArchivoParExterno] = useState(null);
  const [autoridadInstitucional, setAutoridadInstitucional] = useState(false);
  const [archivoAutoridadInstitucional, setArchivoAutoridadInstitucional] =
    useState(null);
  const [sabatico, setSabatico] = useState(false);
  const [archivoSabatico, setArchivoSabatico] = useState(null);
  const [checkIdiomaExtranjero, setCheckIdiomaExtranjero] = useState(false);
  const [idiomaExtranjero, setIdiomaExtranjero] = useState(false);
  const [archivoIdiomaExtranjero, setArchivoIdiomaExtranjero] = useState(null);
  const [checkCapacitacion, setCheckCapacitacion] = useState(false);
  const [checkTesis, setCheckTesis] = useState(false);
  const [checkInvestigacion, setCheckInvestigacion] = useState(false);
  const [checkPonencia, setCheckPonencia] = useState(false);
  const [checkGestionEducativa, setCheckGestionEducativa] = useState(false);
  const [checkAdicional, setCheckAdicional] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [gradoAcademico, setGradoAcademico] = useState("");

  const reglasPorGrado = {
    1: {
      articulos: 5,
    },
    2: {
      articulos: 3,
    },
    3: {
      articulos: 2,
    },
    4: {
      articulos: 1,
    },
    6: {
      articulos: 1,
    },
    7: {
      articulos: 1,
    },
  };

  const calcularHorasCapacitaciones = (capacitaciones) => {
    let horasTotales = 0;
    let horasPedagogicas = 0;

    capacitaciones.forEach((capacitacion) => {
      const duracion = parseInt(capacitacion.capacitacion_duracion, 10);
      horasTotales += duracion;
      if (capacitacion.capacitacion_tipocapacitacion === "PEDAGOGICA") {
        horasPedagogicas += duracion;
      }
    });

    if (parExternoTipo) {
      horasTotales += 16;
    }

    return { horasTotales, horasPedagogicas };
  };

  const calcularMesesParticipacion = (items, tipoParticipacion = null) => {
    let totalMeses = 0;

    items.forEach((item) => {
      if (
        !tipoParticipacion ||
        item.investigacion_tipoparticipacion === tipoParticipacion
      ) {
        const fechaInicio = dayjs(
          item.investigacion_fechainicio || item.ge_fechainicio
        );
        const fechaFin = dayjs(item.investigacion_fechafin || item.ge_fechafin);
        const meses = fechaFin.diff(fechaInicio, "month");
        totalMeses += meses;
      }
    });

    return totalMeses;
  };

  const ajustarReglasPorCondiciones = (reglas, condiciones, grado) => {
    console.log("El archivo sabatico es: ", condiciones.archivoSabatico);
    console.log("El grado es: ", grado);
    let reglasAjustadas = { ...reglas };

    if (condiciones.archivoSabatico) {
      if (grado === "1") {
        reglasAjustadas.articulos = 0;
        reglasAjustadas.capacitaciones = 1;
      }
    }

    return reglasAjustadas;
  };

  const getUsuarioCategoria = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/user-category/${Cookies.get("id")}`,
        {
          method: "GET",
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCategoria(data[0].grado_nombre);
        setGradoAcademico(data[0].usuario_tipo);
      } else {
        console.error(
          "Error al obtener las categorías de usuario:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener las categorías de usuario:", error);
    }
  };

  const handleCheckAdicional = (e) => {
    setCheckAdicional(e.target.checked);
  };

  const handleCheckGestionEducativa = (e) => {
    setCheckGestionEducativa(e.target.checked);
  };

  const handleCheckPonencia = (e) => {
    setCheckPonencia(e.target.checked);
  };

  const handleCheckCapacitacion = (e) => {
    setCheckCapacitacion(e.target.checked);
  };

  const handleCheckTesis = (e) => {
    setCheckTesis(e.target.checked);
  };

  const handleCheckInvestigacion = (e) => {
    setCheckInvestigacion(e.target.checked);
  };

  const handleAdicionalChange = (e) => {
    setActividad(e.target.value);
  };

  const handleAdicionalFileChange = (e) => {
    const { name, files } = e.target;
    setActividad((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleCheckIdiomaExtranjeroChange = (e) => {
    setCheckIdiomaExtranjero(e.target.checked);
  };

  const handleArchivoIdiomaExtranjeroChange = (e) => {
    setArchivoIdiomaExtranjero(e.target.files[0]);
  };

  const handleSabaticoChange = (e) => {
    console.log("El check sabatico es: ", e.target.checked);
    setSabatico(e.target.checked);
  };

  const handleArchivoSabaticoChange = (e) => {
    setArchivoSabatico(e.target.files[0]);
  };

  const handleAutoridadInstitucionalChange = (e) => {
    setAutoridadInstitucional(e.target.checked);
  };

  const handleArchivoAutoridadInstitucionalChange = (e) => {
    setArchivoAutoridadInstitucional(e.target.files[0]);
  };

  const handleParExternoChange = (e) => {
    setParExterno(e.target.checked);
  };

  const handleArchivoParExternoChange = (e) => {
    setArchivoParExterno(e.target.files[0]);
  };

  const handleFacilitadorQAChange = (e) => {
    setFacilitadorQA(e.target.checked);
  };

  const handleArchivoFacilitadorQAChange = (e) => {
    setArchivoFacilitadorQA(e.target.files[0]);
  };

  const handleFacilitadorCESChange = (e) => {
    setFacilitadorCES(e.target.checked);
  };

  const handleArchivoFacilitadorCESChange = (e) => {
    setArchivoFacilitadorCES(e.target.files[0]);
  };

  const handleOpenAgregarAdicional = () => {
    setOpenAgregarAdicional(true);
  };
  
  const handleCloseAgregarAdicional = () => {
    setOpenAgregarAdicional(false);
  };
  
  const handleOpenAgregarArticulo = () => {
    setOpenAgregarArticulo(true);
  };
  
  const handleCloseAgregarArticulo = () => {
    setOpenAgregarArticulo(false);
  };
  
  const handleOpenAgregarCapacitacion = () => {
    setOpenAgregarCapacitacion(true);
  };
  
  const handleOpenAgregarTesis = () => {
    setOpenAgregarTesis(true);
  };
  
  const handleCloseAgregarCapacitacion = () => {
    setOpenAgregarCapacitacion(false);
  };
  
  const handleCloseAgregarTesis = () => {
    setOpenAgregarTesis(false);
  };
  
  const handleOpenAgregarInvestigacion = () => {
    setOpenAgregarInvestigacion(true);
  };
  
  const handleCloseAgregarInvestigacion = () => {
    setOpenAgregarInvestigacion(false);
  };
  
  const handleOpenAgregarPonencia = () => {
    setOpenAgregarPonencia(true);
  };
  
  const handleCloseAgregarPonencia = () => {
    setOpenAgregarPonencia(false);
  };
  
  const handleOpenAgregarGestionEducativa = () => {
    setOpenAgregarGestionEducativa(true);
  };
  
  const handleCloseAgregarGestionEducativa = () => {
    setOpenAgregarGestionEducativa(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCapacitacionChange = (e) => {
    const { name, value } = e.target;
    setCapacitacion((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleTesisChange = (e) => {
    const { name, value } = e.target;
    setTesis((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleInvestigacionChange = (e) => {
    const { name, value } = e.target;
    setInvestigacion((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePonenciaChange = (e) => {
    const { name, value } = e.target;
    setPonencia((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleGestionEducativaChange = (e) => {
    const { name, value } = e.target;
    setGestionEducativa((prev) => ({ ...prev, [name]: value }));
  };
  
  const label = { inputProps: { "aria-label": "Switch demo" } };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setArticulo((prev) => ({ ...prev, [name]: files[0] }));
  };
  
  const handleArchivoCertificadoEvaluacionDocenteChange = (e) => {
    const { name, files } = e.target;
    setArchivoCertificadoEvaluacionDocente((prev) => ({ ...prev, [name]: files[0] }));
  };
  
  const handleCertificadoFileChange = (e) => {
    const { name, files } = e.target;
    setCapacitacion((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleTesisFileChange = (e) => {
    const { name, files } = e.target;
    setTesis((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleInvestigacionFileChange = (e) => {
    const { name, files } = e.target;
    setInvestigacion((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handlePonenciaFileChange = (e) => {
    const { name, files } = e.target;
    setPonencia((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleGestionEducativaFileChange = (e) => {
    const { name, files } = e.target;
    setGestionEducativa((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleAgregarAdicional = () => {
    setActividadesAdicionales((prev) => [...prev, actividad]);
    setActividad({});
    handleCloseAgregarAdicional();
  };

  const handleAgregarArticulo = () => {
    if (articulo.articulo_doi) {
      if (!validarDOI(articulo.articulo_doi)) {
        alert("El DOI ingresado no es válido.");
        return;
      }
    }
    if (!validarISSN(articulo.articulo_issn)) {
      alert("El ISSN ingresado no es válido.");
      return;
    }
    if (!articulo.articulo_link  || !articulo.articulo_fechapublicacion || !articulo.articulo_bdindexada || !articulo.articulo_cuartil || !articulo.articulo_doi || !articulo.articulo_issn) {
      alert("Debe llenar todos los campos.");
      return;
    }
    if (!articulo.articulo_archivo) {
      alert("Debe ingresar un archivo que valide su cumplimiento.");
      return;
    }
    setArticulos((prev) => [...prev, articulo]);
    setArticulo({});
    handleCloseAgregarArticulo();
  };

  const handleAgregarCapacitacion = () => {
    setCapacitaciones((prev) => [...prev, capacitacion]);
    setCapacitacion({});
    handleCloseAgregarCapacitacion();
  };

  const handleAgregarTesis = () => {
    if (!tesis.tesis_nombre || !tesis.tesis_fechapublicacion || !tesis.tesis_fechacertificacion || !tesis.tesis_tipodireccion || !tesis.tesis_externa || !tesis.tesis_universidad || !tesis.tesis_archivo) {
      alert("Debe llenar todos los campos.");
      return;
    }
    setGrupoTesis((prev) => [...prev, tesis]);
    setTesis({});
    handleCloseAgregarTesis();
  };

  const handleAgregarInvestigacion = () => {
    if (!investigacion.investigacion_nombrearchivo || !investigacion.investigacion_fechainicio || !investigacion.investigacion_fechafin || !investigacion.investigacion_tipoparticipacion || !investigacion.investigacion_resultados || !investigacion.investigacion_enfoque || !investigacion.investigacion_archivo) {
      alert("Debe llenar todos los campos.");
      return
    }
    setInvestigaciones((prev) => [...prev, investigacion]);
    setInvestigacion({});
    handleCloseAgregarInvestigacion();
  };

  const handleAgregarPonencia = () => {
    if (!ponencia.ponencia_nombre || !ponencia.ponencia_fecha || !ponencia.ponencia_tipo || !ponencia.ponencia_afinidad || !ponencia.ponencia_archivo) {
      alert("Debe llenar todos los campos.");
      return;
    }
    setPonencias((prev) => [...prev, ponencia]);
    setPonencia({});
    handleCloseAgregarPonencia();
  };

  const handleAgregarGestionEducativa = () => {
    setGestionesEducativas((prev) => [...prev, gestionEducativa]);
    setGestionEducativa({});
    handleCloseAgregarGestionEducativa();
  };

  const handleVerArchivo = (archivo) => {
    if (!archivo) {
      return;
    }
    const url = URL.createObjectURL(archivo);
    window.open(url, "_blank");
  };

  const filtrarPonenciasValidas = (ponencias) => {
    return ponencias.filter((ponencia) => {
      return [
        "ACTIVIDADES DE DOCENCIA",
        "INVESTIGACION",
        "VINCULACION",
      ].includes(ponencia.ponencia_afinidad);
    });
  };

  const handleEnviarPostulacion = async () => {
    const reglas = reglasPorGrado[categoria];

    const condiciones = {
      archivoSabatico,
    };
    console.log("Las condiciones son: ", condiciones);

    const reglasAjustadas = ajustarReglasPorCondiciones(
      reglas,
      condiciones,
      categoria
    );

    const { horasTotales, horasPedagogicas } =
      calcularHorasCapacitaciones(capacitaciones);

    if (categoria === "6" || categoria === "7") {
      if (archivoSabatico) {
        if (horasTotales < 96 * 0.75 || horasPedagogicas < 24 * 0.75) {
          alert("Faltan horas de capacitación pedagógica.");
          return;
        }
      } else {
        if (horasTotales < 96 || horasPedagogicas < 24) {
          alert("Faltan horas de capacitación pedagógica.");
          return;
        }
      }
    } else if (
      categoria === "1" ||
      categoria === "2" ||
      categoria === "3" ||
      categoria === "4"
    ) {
      if (archivoSabatico) {
        if (horasTotales < 128 * 0.75 || horasPedagogicas < 40 * 0.75) {
          alert("Faltan horas de capacitación pedagógica.");
          return;
        }
      } else {
        console.log("Las horas totales son: ", horasTotales);
        console.log("Las horas pedagogicas son: ", horasPedagogicas);
        if (horasTotales < 128 || horasPedagogicas < 40) {
          alert("Faltan horas de capacitación pedagógica.");
          return;
        }
      }
    }

    console.log("Las reglas ajustadas son: ", reglasAjustadas);
    console.log("Las capacitaciones length son: ", capacitaciones.length);
    console.log(
      "las reglas ajustadas para capacitaciones son: ",
      reglasAjustadas.capacitaciones
    );
    console.log("El check capacitacion es: ", checkCapacitacion);

    if (articulos.length < reglasAjustadas.articulos) {
      alert("Faltan artículos por agregar.");
      return;
    }

    if (sabatico && capacitaciones.length < reglasAjustadas.capacitaciones) {
      alert("Faltan capacitaciones por agregar.");
      return;
    }

    if (checkTesis) {
      const tesisDoctorales = grupoTesis.filter(
        (tesis) => tesis.tesis_tipodireccion === "DOCTORAL"
      ).length;
      const tesisMaestria = grupoTesis.filter(
        (tesis) => tesis.tesis_tipodireccion === "MAESTRIA"
      ).length;
      const tesisTercerNivel = grupoTesis.filter(
        (tesis) => tesis.tesis_tipodireccion === "TERCER NIVEL"
      ).length;

      if (categoria === "7") {
        if (tesisDoctorales < 3 && tesisMaestria < 4) {
          alert(
            "Debe haber dirigido al menos tres tesis doctorales o cuatro tesis de maestría."
          );
          return;
        }
      } else if (categoria === "6") {
        if (tesisDoctorales < 2 && tesisMaestria < 4) {
          alert(
            "Debe haber dirigido al menos dos tesis doctorales o tres tesis de maestría."
          );
          return;
        }
      } else if (categoria === "4") {
        if (gradoAcademico === "PhD") {
          if (
            tesisDoctorales < 1 &&
            (tesisMaestria < 3 || tesisTercerNivel < 6)
          ) {
            alert(
              "Debe haber dirigido al menos una tesis doctoral o tres tesis de maestría o seis tesis de tercer nivel."
            );
            return;
          }
        } else {
          if (tesisMaestria < 3 && tesisTercerNivel < 6) {
            alert(
              "Debe haber dirigido al menos tres tesis de maestría o seis tesis de tercer nivel."
            );
            return;
          }
        }
      } else if (categoria === "3") {
        if (gradoAcademico === "PhD") {
          if (
            tesisDoctorales < 1 &&
            (tesisMaestria < 2 || tesisTercerNivel < 4)
          ) {
            alert(
              "Debe haber dirigido al menos una tesis doctoral o dos tesis de maestría o cuatro tesis de tercer nivel."
            );
            return;
          }
        } else {
          if (tesisMaestria < 2 && tesisTercerNivel < 4) {
            alert(
              "Debe haber dirigido al menos dos tesis de maestría o cuatro tesis de tercer nivel."
            );
            return;
          }
        }
      } else if (categoria === "2") {
        if (gradoAcademico === "PhD") {
          if (
            tesisDoctorales < 1 &&
            (tesisMaestria < 2 || tesisTercerNivel < 6)
          ) {
            alert(
              "Debe haber dirigido al menos una tesis doctoral o dos tesis de maestría o seis tesis de tercer nivel."
            );
            return;
          }
        } else {
          if (tesisMaestria < 2 && tesisTercerNivel < 6) {
            alert(
              "Debe haber dirigido al menos dos tesis de maestría o seis tesis de tercer nivel."
            );
            return;
          }
        }
      } else if (categoria === "1") {
        if (gradoAcademico === "PhD") {
          if (
            tesisDoctorales < 1 &&
            tesisMaestria < 2 &&
            tesisTercerNivel < 8
          ) {
            console.log("El grado academico es: ", gradoAcademico);
            console.log("Las tesis doctorales son: ", tesisDoctorales);
            console.log("Las tesis de maestria son: ", tesisMaestria);
            console.log("Las tesis de tercer nivel son: ", tesisTercerNivel);
            alert(
              "Debe haber dirigido al menos una tesis doctoral o dos tesis de maestría u ocho tesis de tercer nivel."
            );
            return;
          }
        } else {
          if (tesisMaestria < 2 && tesisTercerNivel < 8) {
            alert(
              "Debe haber dirigido al menos dos tesis de maestría u ocho tesis de tercer nivel."
            );
            return;
          }
        }
      }
    } else {
      alert("Faltan tesis por agregar.");
      return;
    }

    if (categoria === "7") {
      const mesesDirector = calcularMesesParticipacion(
        investigaciones,
        "DIRECTOR"
      );
      const mesesCodirector = calcularMesesParticipacion(
        investigaciones,
        "CODIRECTOR O EQUIVALENTE"
      );
      const mesesGestionEducativa =
        calcularMesesParticipacion(gestionesEducativas);
      const totalMeses =
        mesesDirector + mesesCodirector + Math.min(mesesGestionEducativa, 18);

      if (totalMeses < 36) {
        alert(
          "Faltan meses de participación en investigación y gestión educativa."
        );
        return;
      }
    } else if (categoria === "6") {
      const mesesDirector = calcularMesesParticipacion(
        investigaciones,
        "DIRECTOR"
      );
      const mesesCodirector = calcularMesesParticipacion(
        investigaciones,
        "CODIRECTOR O EQUIVALENTE"
      );
      const mesesGestionEducativa =
        calcularMesesParticipacion(gestionesEducativas);
      const totalMeses =
        mesesDirector + mesesCodirector + Math.min(mesesGestionEducativa, 12);

      if (totalMeses < 24) {
        alert(
          "Faltan meses de participación en investigación y gestión educativa."
        );
        return;
      }
    } else if (categoria === "4" || categoria === "3" || categoria === "2") {
      const mesesInvestigacion = calcularMesesParticipacion(investigaciones);
      const mesesDirector = calcularMesesParticipacion(
        investigaciones,
        "DIRECTOR"
      );
      const mesesCodirector = calcularMesesParticipacion(
        investigaciones,
        "CODIRECTOR O EQUIVALENTE"
      );
      const mesesDirectorCodirector = mesesDirector + mesesCodirector;
      const mesesGestionEducativa =
        calcularMesesParticipacion(gestionesEducativas);
      const totalMeses =
        mesesInvestigacion + Math.min(mesesGestionEducativa, 12);

      if (totalMeses < 24 && mesesDirectorCodirector < 12) {
        alert(
          "Faltan meses de participación en investigación y gestión educativa."
        );
        return;
      }
    } else if (categoria === "1") {
      const mesesInvestigacion = calcularMesesParticipacion(investigaciones);
      const mesesGestionEducativa =
        calcularMesesParticipacion(gestionesEducativas);
      const totalMeses =
        mesesInvestigacion + Math.min(mesesGestionEducativa, 6);

      if (totalMeses < 24) {
        alert(
          "Faltan meses de participación en investigación y gestión educativa."
        );
        return;
      }
    }

    // Verificar participación en ponencias
    const ponenciasValidas = filtrarPonenciasValidas(ponencias);
    const ponenciasInternacionales = ponenciasValidas.filter(
      (ponencia) => ponencia.ponencia_tipo === "INTERNACIONAL"
    );
    const ponenciasNacionales = ponenciasValidas.filter(
      (ponencia) => ponencia.ponencia_tipo === "NACIONAL"
    );

    if (categoria === "7") {
      if (ponenciasInternacionales.length < 3) {
        alert(
          "Debe haber participado como ponente en al menos tres eventos académicos internacionales con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    } else if (categoria === "6") {
      if (ponenciasInternacionales.length < 2) {
        alert(
          "Debe haber participado como ponente en al menos dos eventos académicos internacionales con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    } else if (categoria === "4") {
      if (
        ponenciasInternacionales.length < 1 ||
        ponenciasNacionales.length < 1
      ) {
        alert(
          "Debe haber participado como ponente en al menos dos eventos académicos, uno nacional y uno internacional, con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    } else if (categoria === "3") {
      if (ponenciasValidas.length < 2) {
        alert(
          "Debe haber participado como ponente en al menos dos eventos académicos nacionales o internacionales con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    } else if (categoria === "2") {
      if (ponenciasValidas.length < 1) {
        alert(
          "Debe haber participado como ponente en al menos un evento académico nacional o internacional con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    } else if (categoria === "1") {
      if (ponenciasValidas.length < 1) {
        alert(
          "Debe haber participado como ponente en al menos un evento académico nacional o internacional con afinidad a docencia, investigación o vinculación."
        );
        return;
      }
    }

    if (
      checkInvestigacion &&
      investigaciones.length < reglasAjustadas.investigaciones
    ) {
      alert("Faltan investigaciones por agregar.");
      return;
    }

    if (
      checkGestionEducativa &&
      gestionesEducativas.length < reglasAjustadas.gestionesEducativas
    ) {
      alert("Faltan gestiones educativas por agregar.");
      return;
    }

    const formData = new FormData();

    formData.append("usuario_id", Cookies.get("id"));

    // Agrega datos de cada artículo al FormData
    articulos.forEach((articulo, index) => {
      formData.append(
        `articulo_titulo_${index}`,
        articulo.articulo_nombrearchivo
      );
      formData.append(
        `articulo_nombrerevista_${index}`,
        articulo.articulo_nombrerevista
      );
      formData.append(
        `articulo_ordenauditoria_${index}`,
        articulo.articulo_ordenauditoria
      );
      formData.append(`articulo_doi_${index}`, articulo.articulo_doi);
      formData.append(`articulo_issn_${index}`, articulo.articulo_issn);
      formData.append(`articulo_link_${index}`, articulo.articulo_link);
      formData.append(
        `articulo_fechapublicacion_${index}`,
        dayjs(articulo.articulo_fechapublicacion).format("YYYY-MM-DD")
      );
      formData.append(
        `articulo_bdindexada_${index}`,
        articulo.articulo_bdindexada
      );
      formData.append(`articulo_cuartil_${index}`, articulo.articulo_cuartil);
      if (articulo.articulo_archivo) {
        formData.append(`articulo_archivo_${index}`, articulo.articulo_archivo);
      }
    });

    if (checkCapacitacion) {
      formData.append("checkCapacitacion", checkCapacitacion);
      capacitaciones.forEach((capacitacion, index) => {
        formData.append(
          `capacitacion_nombreevento_${index}`,
          capacitacion.capacitacion_nombreevento
        );
        formData.append(
          `capacitacion_institucion_${index}`,
          capacitacion.capacitacion_institucion
        );
        formData.append(
          `capacitacion_tipocertificado_${index}`,
          capacitacion.capacitacion_tipocertificado
        );
        formData.append(
          `capacitacion_duracion_${index}`,
          capacitacion.capacitacion_duracion
        );
        formData.append(
          `capacitacion_fechaevento_${index}`,
          dayjs(capacitacion.capacitacion_fechaevento).format("YYYY-MM-DD")
        );
        formData.append(
          `capacitacion_tipocapacitacion_${index}`,
          capacitacion.capacitacion_tipocapacitacion
        );
        if (capacitacion.capacitacion_archivo) {
          formData.append(
            `capacitacion_archivo_${index}`,
            capacitacion.capacitacion_archivo
          );
        }
      });
    }

    if (checkTesis) {
      formData.append("checkTesis", checkTesis);
      grupoTesis.forEach((tesis, index) => {
        formData.append(`tesis_titulo_${index}`, tesis.tesis_nombre);
        formData.append(
          `tesis_fechapublicacion_${index}`,
          dayjs(tesis.tesis_fechapublicacion).format("YYYY-MM-DD")
        );
        formData.append(
          `tesis_fechacertificacion_${index}`,
          dayjs(tesis.tesis_fechacertificacion).format("YYYY-MM-DD")
        );
        formData.append(
          `tesis_tipodireccion_${index}`,
          tesis.tesis_tipodireccion
        );
        formData.append(`tesis_externa_${index}`, tesis.tesis_externa);
        formData.append(`tesis_universidad_${index}`, tesis.tesis_universidad);
        if (tesis.tesis_archivo) {
          formData.append(`tesis_archivo_${index}`, tesis.tesis_archivo);
        }
      });
    }

    if (checkInvestigacion) {
      formData.append("checkInvestigacion", checkInvestigacion);
      investigaciones.forEach((investigacion, index) => {
        formData.append(
          `investigacion_titulo_${index}`,
          investigacion.investigacion_nombrearchivo
        );
        formData.append(
          `investigacion_fechainicio_${index}`,
          dayjs(investigacion.investigacion_fechainicio).format("YYYY-MM-DD")
        );
        formData.append(
          `investigacion_fechafin_${index}`,
          dayjs(investigacion.investigacion_fechafin).format("YYYY-MM-DD")
        );
        formData.append(
          `investigacion_tipoparticipacion_${index}`,
          investigacion.investigacion_tipoparticipacion
        );
        formData.append(
          `investigacion_resultados_${index}`,
          investigacion.investigacion_resultados
        );
        formData.append(
          `investigacion_enfoque_${index}`,
          investigacion.investigacion_enfoque
        );
        if (investigacion.investigacion_archivo) {
          formData.append(
            `investigacion_archivo_${index}`,
            investigacion.investigacion_archivo
          );
        }
      });
    }

    if (checkGestionEducativa) {
      formData.append("checkGestionEducativa", checkGestionEducativa);
      gestionesEducativas.forEach((gestionEducativa, index) => {
        formData.append(`ge_actividad_${index}`, gestionEducativa.ge_actividad);
        formData.append(
          `ge_fechainicio_${index}`,
          dayjs(gestionEducativa.ge_fechainicio).format("YYYY-MM-DD")
        );
        formData.append(
          `ge_fechafin_${index}`,
          dayjs(gestionEducativa.ge_fechafin).format("YYYY-MM-DD")
        );
        if (gestionEducativa.ge_archivo) {
          formData.append(`ge_archivo_${index}`, gestionEducativa.ge_archivo);
        }
      });
    }

    if (checkPonencia) {
      formData.append("checkPonencia", checkPonencia);
      ponencias.forEach((ponencia, index) => {
        formData.append(`ponencia_tipo_${index}`, ponencia.ponencia_tipo);
        formData.append(`ponencia_nombre_${index}`, ponencia.ponencia_nombre);
        formData.append(
          `ponencia_afinidad_${index}`,
          ponencia.ponencia_afinidad
        );
        formData.append(
          `ponencia_fecha_${index}`,
          dayjs(ponencia.ponencia_fecha).format("YYYY-MM-DD")
        );
        if (ponencia.ponencia_archivo) {
          console.log("El archivo de la ponencia es: ", ponencia.ponencia_archivo);
          formData.append(
            `ponencia_archivo_${index}`,
            ponencia.ponencia_archivo
          );
        }
      });
    }

    // Agrega otros archivos como certificados
    if (archivoFacilitadorCES) {
      formData.append("archivoFacilitadorCES", archivoFacilitadorCES);
    }
    if (archivoFacilitadorQA) {
      formData.append("archivoFacilitadorQA", archivoFacilitadorQA);
    }
    if (certificadoEvaluacionDocente) {
      if (categoria === "7" || categoria === "6") {
        if (certificadoEvaluacionDocente.ced_porcentaje < 90) {
          alert("El porcentaje de evaluación docente debe ser mayor a 90.");
          return;
        } else {
          formData.append(
            "ced_porcentaje",
            certificadoEvaluacionDocente.ced_porcentaje
          );
          formData.append(
            "ced_archivo",
            archivoCertificadoEvaluacionDocente.certificado_evaluaciondocente
          )
        }
      } else if (categoria === "4" || categoria === "3" || categoria === "2") {
        if (certificadoEvaluacionDocente.ced_porcentaje < 85) {
          alert("El porcentaje de evaluación docente debe ser mayor a 85");
          return;
        } else {
          formData.append(
            "ced_porcentaje",
            certificadoEvaluacionDocente.ced_porcentaje
          );
          formData.append(
            "ced_archivo",
            archivoCertificadoEvaluacionDocente.certificado_evaluaciondocente
          )
        }
      } else if (categoria === "1") {
        if (certificadoEvaluacionDocente.ced_porcentaje < 80) {
          alert("El porcentaje de evaluación docente debe ser mayor a 80.");
          return;
        } else {
          formData.append(
            "ced_porcentaje",
            certificadoEvaluacionDocente.ced_porcentaje
          );
          console.log("uyt")
          console.log("El archivo de evaluación docente es: ", archivoCertificadoEvaluacionDocente.ced_archivo);
          formData.append(
            "ced_archivo",
            archivoCertificadoEvaluacionDocente.ced_archivo
          )
        }
      }
    } else {
      alert("Falta el certificado de evaluación docente.");
      return;
    }
    if (archivoParExterno) {
      formData.append("archivoParExterno", archivoParExterno);
    }
    if (archivoAutoridadInstitucional) {
      formData.append(
        "archivoAutoridadInstitucional",
        archivoAutoridadInstitucional
      );
    }
    if (archivoSabatico) {
      formData.append("archivoSabatico", archivoSabatico);
    }
    if (categoria !== "1") {
      if (!archivoIdiomaExtranjero) {
        alert("Falta el certificado de idioma extranjero.");
        return;
      } else {
        if (categoria === "7" || categoria === "6" || categoria === "4" || categoria === "3") {
          console.log("El idioma extranjero es: ", idiomaExtranjero);
          if (idiomaExtranjero !== "B2") {
            alert("El nivel de idioma extranjero debe ser B2.");
            return;
          } else {
            formData.append("idioma_nivel", idiomaExtranjero);
            formData.append("idioma_archivo", archivoIdiomaExtranjero);
          }
        } else if (categoria === "2") {
          if (idiomaExtranjero !== "B1" && idiomaExtranjero !== "B2") {
            alert("El nivel de idioma extranjero debe ser B1 o B2.");
            return;
          } else {
            formData.append("idioma_nivel", idiomaExtranjero);
            formData.append("idioma_archivo", archivoIdiomaExtranjero);
          }
        }
      }
    }
    if (actividadesAdicionales.length > 0) {
      actividadesAdicionales.forEach((actividad, index) => {
        formData.append(
          `adicional_criterio_${index}`,
          actividad.actividad_tipo
        );
        formData.append(
          `adicional_archivo_${index}`,
          actividad.actividad_archivo
        );
      });
    }

    console.log("El formData es: ", formData);

    try {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(`${config.apiBaseUrl}/postulacion`, {
        method: "POST",
        headers: {
          token: Cookies.get("token"),
        },
        body: formData,
      });

      if (response.ok) {
        alert("Postulación enviada con éxito.");
      } else {
        alert("Error al enviar la postulación.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUsuarioCategoria();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
      }}
    >
      <h3>Formulario de postulación</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
          padding: "1rem",
        }}
      >
        <h4>Artículos en revistas indexadas u obras de relevancia</h4>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "rgb(0, 113, 121)", marginBottom: "1rem" }}
          onClick={handleOpenAgregarArticulo}
        >
          Agregar nuevo
        </Button>
        <TableContainer
          component={Paper}
          sx={{
            width: "80%",
            maxHeight: "70vh",
            overflow: "auto",
            marginBottom: "1rem",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  size="small"
                  style={{ backgroundColor: "rgb(206, 206, 206)" }}
                >
                  Número
                </TableCell>
                <TableCell
                  size="small"
                  style={{ backgroundColor: "rgb(206, 206, 206)" }}
                >
                  Título
                </TableCell>
                <TableCell
                  size="small"
                  style={{ backgroundColor: "rgb(206, 206, 206)" }}
                >
                  Nombre de la revista
                </TableCell>
                <TableCell
                  size="small"
                  style={{ backgroundColor: "rgb(206, 206, 206)" }}
                >
                  Link
                </TableCell>
                <TableCell
                  size="small"
                  style={{ backgroundColor: "rgb(206, 206, 206)" }}
                >
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articulos.map((articulo, index) => (
                <TableRow key={index}>
                  <TableCell size="small">{index + 1}</TableCell>
                  <TableCell size="small">
                    {articulo.articulo_nombrearchivo}
                  </TableCell>
                  <TableCell size="small">
                    {articulo.articulo_nombrerevista}
                  </TableCell>
                  <TableCell size="small">{articulo.articulo_link}</TableCell>
                  <TableCell size="small">
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "rgb(0, 113, 121)",
                        marginRight: "1rem",
                      }}
                      onClick={() =>
                        handleVerArchivo(articulo.articulo_archivo)
                      }
                    >
                      Ver archivo
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        const newArticulos = articulos.filter(
                          (_, i) => i !== index
                        );
                        setArticulos(newArticulos);
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
        <h4>Evaluación integral del desempeño docente</h4>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ marginRight: "1rem" }}>Agregar certificado</p>
          <TextField
            size="small"
            type="file"
            variant="outlined"
            style={{ width: "60%", marginBottom: "1rem", marginRight: "1rem" }}
            name="ced_archivo"
            onChange={handleArchivoCertificadoEvaluacionDocenteChange}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Porcentaje de evaluación"
            name="ced_porcentaje"
            sx={{ width: "20%", marginBottom: "1rem" }}
            onChange={(e) => {
              setCertificadoEvaluacionDocente({
                ...certificadoEvaluacionDocente,
                ced_porcentaje: e.target.value,
              });
            }}
          />
        </Box>
        {/**
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Ha participado como facilitador CES?
          </p>
          <Switch
            {...label}
            checked={facilitadorCES}
            onChange={handleFacilitadorCESChange}
          />
        </Box>
        {facilitadorCES && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginRight: "1rem" }}>
              Agregar archivo de facilitador CES
            </p>
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "60%", marginBottom: "1rem" }}
              name="archivoFacilitadorCES"
              onChange={handleArchivoFacilitadorCESChange}
            />
          </Box>
        )}
           */}
           {/**
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Ha participado como facilitador QA?
          </p>
          <Switch
            {...label}
            checked={facilitadorQA}
            onChange={handleFacilitadorQAChange}
          />
        </Box>
        {facilitadorQA && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginRight: "1rem" }}>
              Agregar archivo de facilitador QA
            </p>
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "60%", marginBottom: "1rem" }}
              name="archivoFacilitadorCES"
              onChange={handleArchivoFacilitadorQAChange}
            />
          </Box>
        )}
           */}

            {/**
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Ha participado como par externo?
          </p>
          <Switch
            {...label}
            checked={parExterno}
            onChange={handleParExternoChange}
          />
        </Box>
        {parExterno && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginRight: "1rem" }}>
              Agregar archivo de par externo
            </p>
            <Autocomplete
              id="combo-box-demo"
              options={[
                "Miembro externo de una comisión de evaluación de concursos de méritos y oposición",
                "Par externo de evaluación de proyectos de investigación de universidades o escuelas politécnicas, institutos públicos de investigación u otros organismos públicos",
              ]}
              style={{
                width: "60%",
                marginBottom: "1rem",
                marginRight: "1rem",
              }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Tipo de participación" />
              )}
              onChange={(event, value) => {
                setParExternoTipo(value);
              }}
            />
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{
                width: "60%",
                marginBottom: "1rem",
              }}
              name="archivoFacilitadorCES"
              onChange={handleArchivoParExternoChange}
            />
          </Box>
        )}
            */}

            {/**
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Ha participado como autoridad institucional?
          </p>
          <Switch
            {...label}
            checked={autoridadInstitucional}
            onChange={handleAutoridadInstitucionalChange}
          />
        </Box>
        {autoridadInstitucional && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginRight: "1rem" }}>
              Agregar archivo de autoridad institucional
            </p>
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "60%", marginBottom: "1rem" }}
              name="archivoFacilitadorCES"
              onChange={handleArchivoAutoridadInstitucionalChange}
            />
          </Box>
        )}
            */}

            {/**
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Ha tomado un tiempo sabático?
          </p>
          <Switch
            {...label}
            checked={sabatico}
            onChange={handleSabaticoChange}
          />
        </Box>
        {sabatico && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <p style={{ marginRight: "1rem" }}>
              Agregar archivo de tiempo sabático tomado
            </p>
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "60%", marginBottom: "1rem" }}
              name="archivoFacilitadorCES"
              onChange={handleArchivoSabaticoChange}
            />
          </Box>
        )}
            */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Desea agregar capacitaciones?
          </p>
          <Switch
            {...label}
            checked={checkCapacitacion}
            onChange={handleCheckCapacitacion}
          />
        </Box>
        {checkCapacitacion && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarCapacitacion}
            >
              Agregar Capacitación
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la capacitación</TableCell>
                    <TableCell>Institución</TableCell>
                    <TableCell>Duración</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {capacitaciones.map((capacitacion, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {capacitacion.capacitacion_nombreevento}
                      </TableCell>
                      <TableCell>
                        {capacitacion.capacitacion_institucion}
                      </TableCell>
                      <TableCell>
                        {capacitacion.capacitacion_duracion}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() =>
                            handleVerArchivo(capacitacion.capacitacion_archivo)
                          }
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newCapacitaciones = capacitaciones.filter(
                              (_, i) => i !== index
                            );
                            setCapacitaciones(newCapacitaciones);
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
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Agregar certificado de idioma extranjero?
          </p>
          <Switch
            {...label}
            checked={checkIdiomaExtranjero}
            onChange={handleCheckIdiomaExtranjeroChange}
          />
        </Box>
        {checkIdiomaExtranjero && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <p style={{ marginRight: "1rem" }}>
                Agregar certificado de idioma extranjero
              </p>
              <TextField
                size="small"
                type="file"
                variant="outlined"
                style={{
                  width: "60%",
                  marginBottom: "1rem",
                  marginRight: "1rem",
                }}
                name="archivoFacilitadorCES"
                onChange={handleArchivoIdiomaExtranjeroChange}
              />
              <Autocomplete
                options={["B1", "B2"]}
                getOptionLabel={(option) => option}
                style={{ width: "20%", marginBottom: "1rem" }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nivel de idioma"
                    variant="outlined"
                  />
                )}
                onChange={(e, value) => setIdiomaExtranjero(value)}
              />
            </Box>
          </>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Has dirigido tesis?
          </p>
          <Switch {...label} checked={checkTesis} onChange={handleCheckTesis} />
        </Box>
        {checkTesis && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarTesis}
            >
              Agregar Tesis
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la tesis</TableCell>
                    <TableCell>Institución</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grupoTesis.map((tesis, index) => (
                    <TableRow key={index}>
                      <TableCell>{tesis.tesis_nombre}</TableCell>
                      <TableCell>{tesis.tesis_universidad}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() => handleVerArchivo(tesis.tesis_archivo)}
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newGrupoTesis = grupoTesis.filter(
                              (_, i) => i !== index
                            );
                            setGrupoTesis(newGrupoTesis);
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
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Has realizado trabajos de investigación?
          </p>
          <Switch
            {...label}
            checked={checkInvestigacion}
            onChange={handleCheckInvestigacion}
          />
        </Box>
        {checkInvestigacion && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarInvestigacion}
            >
              Agregar Investigación
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la investigación</TableCell>
                    <TableCell>Tipo de participación</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investigaciones.map((investigacion, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {investigacion.investigacion_nombrearchivo}
                      </TableCell>
                      <TableCell>
                        {investigacion.investigacion_tipoparticipacion}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() =>
                            handleVerArchivo(
                              investigacion.investigacion_archivo
                            )
                          }
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newInvestigaciones = investigaciones.filter(
                              (_, i) => i !== index
                            );
                            setInvestigaciones(newInvestigaciones);
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
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Has realizado una ponencia?
          </p>
          <Switch
            {...label}
            checked={checkPonencia}
            onChange={handleCheckPonencia}
          />
        </Box>
        {checkPonencia && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarPonencia}
            >
              Agregar Ponencia
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la ponencia</TableCell>
                    <TableCell>Tipo de ponencia</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ponencias.map((ponencia, index) => (
                    <TableRow key={index}>
                      <TableCell>{ponencia.ponencia_nombre}</TableCell>
                      <TableCell>{ponencia.ponencia_tipo}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() =>
                            handleVerArchivo(ponencia.ponencia_archivo)
                          }
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newPonencias = ponencias.filter(
                              (_, i) => i !== index
                            );
                            setPonencias(newPonencias);
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
          </Box>
        )}

        {/*
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Has realizado actividades de gestión educativa?
          </p>
          <Switch
            {...label}
            checked={checkGestionEducativa}
            onChange={handleCheckGestionEducativa}
          />
        </Box>
        {checkGestionEducativa && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarGestionEducativa}
            >
              Agregar certificado de gestión educativa
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la actividad</TableCell>
                    <TableCell>Fecha de inicio</TableCell>
                    <TableCell>Fecha de fin</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gestionesEducativas.map((gestion, index) => (
                    <TableRow key={index}>
                      <TableCell>{gestion.ge_actividad}</TableCell>
                      <TableCell>
                        {dayjs(gestion.ge_fechainicio).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(gestion.ge_fechafin).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() => handleVerArchivo(gestion.ge_archivo)}
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newGestionesEducativas =
                              gestionesEducativas.filter((_, i) => i !== index);
                            setGestionesEducativas(newGestionesEducativas);
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
          </Box>
        )}
        */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgb(206, 206, 206)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              alignContent: "center",
              marginRight: "1rem",
            }}
          >
            ¿Has realizado actividades extra?
          </p>
          <Switch
            {...label}
            checked={checkAdicional}
            onChange={handleCheckAdicional}
          />
        </Box>
        {checkAdicional && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "rgb(0, 113, 121)",
                marginBottom: "1rem",
              }}
              onClick={handleOpenAgregarAdicional}
            >
              Agregar actividad extra
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre de la actividad</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actividadesAdicionales.map((actividad, index) => (
                    <TableRow key={index}>
                      <TableCell>{actividad.actividad_tipo}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "rgb(0, 113, 121)",
                            marginRight: "1rem",
                          }}
                          onClick={() =>
                            handleVerArchivo(actividad.actividad_archivo)
                          }
                        >
                          Ver archivo
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            const newActividadesAdicionales =
                              actividadesAdicionales.filter(
                                (_, i) => i !== index
                              );
                            setActividadesAdicionales(
                              newActividadesAdicionales
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
          </Box>
        )}

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
            style={{ backgroundColor: "red", marginRight: "1rem" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "rgb(0, 113, 121)" }}
            onClick={handleEnviarPostulacion}
          >
            Enviar postulación
          </Button>
        </Box>
      </Box>
      <Modal open={openAgregarArticulo} onClose={handleCloseAgregarArticulo}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Artículo en revista indexada u obra de relevancia</h4>
            <TextField
              label="Título del artículo"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_nombrearchivo"
              value={articulo.articulo_nombrearchivo}
              onChange={handleChange}
            />
            <TextField
              label="Nombre de la revista"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_nombrerevista"
              value={articulo.articulo_nombrerevista}
              onChange={handleChange}
            />
            <TextField
              label="Orden de auditoría"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_ordenauditoria"
              value={articulo.articulo_ordenauditoria}
              onChange={handleChange}
            />
            <TextField
              label="DOI"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_doi"
              value={articulo.articulo_doi}
              onChange={handleChange}
            />
            <TextField
              label="ISSN o e-ISSN"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_issn"
              value={articulo.articulo_issn}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de publicación"
                format="DD/MM/YYYY"
                value={articulo.articulo_fechapublicacion}
                onChange={(date) =>
                  setArticulo((prev) => ({
                    ...prev,
                    articulo_fechapublicacion: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="fecha_inicio"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <TextField
              label="Nombre de la base de datos (SCOPUS, Springer, etc.)"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_bdindexada"
              value={articulo.articulo_bdindexada}
              onChange={handleChange}
            />
            <Autocomplete
              options={["1", "2", "3", "4"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="articulo_cuartil"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Cuartil del año de publicación"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setArticulo((prev) => ({ ...prev, articulo_cuartil: value }))
              }
            />
            <TextField
              label="Link"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="articulo_link"
              value={articulo.articulo_link}
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p>Archivo</p>
              <TextField
                size="small"
                type="file"
                variant="outlined"
                style={{ width: "90%", marginBottom: "1rem" }}
                name="articulo_archivo"
                onChange={handleFileChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarArticulo}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarArticulo}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openAgregarCapacitacion}
        onClose={handleCloseAgregarCapacitacion}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Documento de capacitación</h4>
            <TextField
              label="Nombre de evento"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="capacitacion_nombreevento"
              value={capacitacion.capacitacion_nombreevento}
              onChange={handleCapacitacionChange}
            />
            <TextField
              label="Nombre de institución"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="capacitacion_institucion"
              value={capacitacion.capacitacion_institucion}
              onChange={handleCapacitacionChange}
            />
            <TextField
              label="Tipo de certificado"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="capacitacion_tipocertificado"
              value={capacitacion.capacitacion_tipocertificado}
              onChange={handleCapacitacionChange}
            />
            <TextField
              label="Duración de la capacitación"
              type="number"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              inputProps={{ min: 0 }}
              name="capacitacion_duracion"
              value={capacitacion.capacitacion_duracion}
              onChange={handleCapacitacionChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha del evento"
                format="DD/MM/YYYY"
                value={capacitacion.capacitacion_fechaevento}
                onChange={(date) =>
                  setCapacitacion((prev) => ({
                    ...prev,
                    capacitacion_fechaevento: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="capacitacion_fechaevento"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <Autocomplete
              options={["PEDAGOGICA", "OTRO"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="capacitacion_tipocapacitacion"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de la capacitación"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setCapacitacion((prev) => ({
                  ...prev,
                  capacitacion_tipocapacitacion: value,
                }))
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <p>Archivo de capacitación</p>
              <TextField
                size="small"
                type="file"
                variant="outlined"
                style={{ width: "90%", marginBottom: "1rem" }}
                name="capacitacion_archivo"
                onChange={handleCertificadoFileChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarCapacitacion}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarCapacitacion}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={openAgregarTesis} onClose={handleCloseAgregarTesis}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Tesis</h4>
            <TextField
              label="Nombre de la tesis"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="tesis_nombre"
              value={tesis.tesis_nombre}
              onChange={handleTesisChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de publicación"
                format="DD/MM/YYYY"
                value={tesis.tesis_fechapublicacion}
                onChange={(date) =>
                  setTesis((prev) => ({
                    ...prev,
                    tesis_fechapublicacion: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="tesis_fechapublicacion"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de certificación"
                format="DD/MM/YYYY"
                value={tesis.tesis_fechacertificacion}
                onChange={(date) =>
                  setTesis((prev) => ({
                    ...prev,
                    tesis_fechacertificacion: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="tesis_fechacertificacion"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <Autocomplete
              options={["DOCTORAL", "MAESTRIA", "TERCER NIVEL"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="tesis_tipodireccion"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de tesis"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setTesis((prev) => ({
                  ...prev,
                  tesis_tipodireccion: value,
                }))
              }
            />
            <Autocomplete
              options={["NO", "SI"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="tesis_externa"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tesis externa"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setTesis((prev) => ({
                  ...prev,
                  tesis_externa: value,
                }))
              }
            />
            <TextField
              label="Universidad de la tesis"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="tesis_universidad"
              value={tesis.tesis_universidad}
              onChange={handleTesisChange}
            />
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
              name="tesis_archivo"
              onChange={handleTesisFileChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarTesis}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarTesis}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openAgregarInvestigacion}
        onClose={handleCloseAgregarInvestigacion}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Investigación</h4>
            <TextField
              label="Nombre de la investigación"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="investigacion_nombrearchivo"
              value={investigacion.investigacion_nombrearchivo}
              onChange={handleInvestigacionChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de inicio"
                format="DD/MM/YYYY"
                value={investigacion.investigacion_fechainicio}
                onChange={(date) =>
                  setInvestigacion((prev) => ({
                    ...prev,
                    investigacion_fechainicio: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="investigacion_fechainicio"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de finalización"
                format="DD/MM/YYYY"
                value={investigacion.investigacion_fechafin}
                onChange={(date) =>
                  setInvestigacion((prev) => ({
                    ...prev,
                    investigacion_fechafin: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="investigacion_fechafin"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <Autocomplete
              options={["DIRECTOR", "CODIRECTOR O EQUIVALENTE", "OTRO"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="investigacion_tipoparticipacion"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de participación"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setInvestigacion((prev) => ({
                  ...prev,
                  investigacion_tipoparticipacion: value,
                }))
              }
            />
            <TextField
              label="Resultados de la investigación"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="investigacion_resultados"
              value={investigacion.investigacion_resultados}
              onChange={handleInvestigacionChange}
            />
            <Autocomplete
              options={[
                "GRUPOS VULNERABLES E HISTORICAMENTE EXCLUIDOS",
                "NECESIDADES SOCIALES, SECTORIALES Y PRODUCTIVAS",
                "ZONAS RURALES",
                "INVESTIGACION BASICA",
                "OTRO",
              ]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="investigacion_enfoque"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enfoque de la investigación"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setInvestigacion((prev) => ({
                  ...prev,
                  investigacion_enfoque: value,
                }))
              }
            />
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
              name="investigacion_archivo"
              onChange={handleInvestigacionFileChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarInvestigacion}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarInvestigacion}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal open={openAgregarPonencia} onClose={handleCloseAgregarPonencia}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Ponencia</h4>
            <TextField
              label="Nombre de la ponencia"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="ponencia_nombre"
              value={ponencia.ponencia_nombre}
              onChange={handlePonenciaChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de la ponencia"
                format="DD/MM/YYYY"
                value={ponencia.ponencia_fecha}
                onChange={(date) =>
                  setPonencia((prev) => ({
                    ...prev,
                    ponencia_fecha: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="ponencia_fecha"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <Autocomplete
              options={["NACIONAL", "INTERNACIONAL"]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="ponencia_tipo"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de la ponencia"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setPonencia((prev) => ({
                  ...prev,
                  ponencia_tipo: value,
                }))
              }
            />
            <Autocomplete
              options={[
                "ACTIVIDADES DE DOCENCIA",
                "INVESTIGACION",
                "VINCULACION",
              ]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="ponencia_afinidad"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Afinidad de la ponencia"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setPonencia((prev) => ({
                  ...prev,
                  ponencia_afinidad: value,
                }))
              }
            />
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
              name="ponencia_archivo"
              onChange={handlePonenciaFileChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarPonencia}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarPonencia}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openAgregarGestionEducativa}
        onClose={handleCloseAgregarGestionEducativa}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Gestión Educativa</h4>
            <TextField
              label="Actividad de gestión educativa"
              variant="outlined"
              size="small"
              style={{ marginBottom: "1rem", width: "100%" }}
              name="ge_actividad"
              value={gestionEducativa.ge_actividad}
              onChange={handleGestionEducativaChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de inicio de la actividad"
                format="DD/MM/YYYY"
                value={gestionEducativa.ge_fechainicio}
                onChange={(date) =>
                  setGestionEducativa((prev) => ({
                    ...prev,
                    ge_fechainicio: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="ge_fechainicio"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de finalización de la actividad"
                format="DD/MM/YYYY"
                value={gestionEducativa.ge_fechafin}
                onChange={(date) =>
                  setGestionEducativa((prev) => ({
                    ...prev,
                    ge_fechafin: date,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ width: "100%" }} />
                )}
                name="ge_fechafin"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </LocalizationProvider>

            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
              name="ge_archivo"
              onChange={handleGestionEducativaFileChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarGestionEducativa}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarGestionEducativa}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={openAgregarAdicional} onClose={handleCloseAgregarAdicional}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
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
              maxHeight: "100%",
            }}
          >
            <h4>Actividad extra</h4>
            <Autocomplete
              options={[
                `Obtención de premios nacionales o internacionales en eventos académicos, de investigación o vinculación con la sociedad`,
                `Reconocimiento profesional, académico o científico otorgado por otras instituciones o por una universidad o escuela politécnica externa`,
                `Por acciones afirmativas que promuevan la igualdad de oportunidades para personas en situación de vulnerabilidad, discapacidades, género y pertenencia a pueblos y nacionalidades indígenas, afrodescendientes y montubios`,
                `Experiencia laboral en el ejercicio de su profesión`,
                `Publicaciones en cuartil 1 de las bases de datos WOS y/o Scopus`,
                `Publicaciones como primer o segundo autor en el marco de redes de investigación internacionales (con la colaboración de dos o más universidades de distintas localidades)`,
                `Citaciones a las publicaciones científicas (Scopus, Google Scholar)`,
              ]}
              getOptionLabel={(option) => option}
              style={{ width: "100%", marginBottom: "1rem" }}
              size="small"
              name="actividad_tipo"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Criterio de actividad"
                  variant="outlined"
                  size="small"
                />
              )}
              onChange={(e, value) =>
                setActividad((prev) => ({ ...prev, actividad_tipo: value }))
              }
            />
            <TextField
              size="small"
              type="file"
              variant="outlined"
              style={{ width: "100%", marginBottom: "1rem" }}
              name="actividad_archivo"
              onChange={handleAdicionalFileChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="small"
                style={{ backgroundColor: "red" }}
                onClick={handleCloseAgregarAdicional}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "rgb(0, 113, 121)",
                  marginLeft: "1rem",
                }}
                onClick={handleAgregarAdicional}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Postulacion;
