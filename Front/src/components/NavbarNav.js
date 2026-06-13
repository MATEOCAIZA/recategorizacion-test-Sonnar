import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/espe.png";
import configImg from "../assets/config-invert.png";
import user from "../assets/user-invert.png";
import * as FaIcons from "react-icons/fa";
import config from "../config";

function NavbarNav(args) {
  const [roles, setRoles] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false);
  const [isRecategorizacionDropdownOpen, setIsRecategorizacionDropdownOpen] =
    useState(false);
  const [isMasOpcionesDropdownOpen, setIsMasOpcionesDropdownOpen] =
    useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleIconDropdown = () => setIsIconDropdownOpen(!isIconDropdownOpen);
  const toggleRecategorizacionDropdown = () =>
    setIsRecategorizacionDropdownOpen(!isRecategorizacionDropdownOpen);
  const toggleMasOpcionesDropdown = () =>
    setIsMasOpcionesDropdownOpen(!isMasOpcionesDropdownOpen);

  const handleNavigate = (path) => {
    navigate(path);
    setIsIconDropdownOpen(false);
    setIsRecategorizacionDropdownOpen(false);
    setIsMasOpcionesDropdownOpen(false);
  };

  const handleGetNombre = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/user-name/${Cookies.get("id")}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setNombreUsuario(data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleObtenerRolesPorUsuario = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/roles/${Cookies.get("id")}`,
        {
          method: "GET",
          headers: { token: Cookies.get("token") },
        }
      );
      const data = await response.json();
      setRoles(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetNombre();
    handleObtenerRolesPorUsuario();
  }, []);

  const isAdmin = roles.some((rol) => rol.rol_nombre === "ADMIN");
  const isComision = roles.some(
    (rol) => rol.rol_nombre === "COMISION" || rol.rol_nombre === "SUBCOMISION"
  );
  const isPersonalAcademico = roles.some(
    (rol) => rol.rol_nombre === "PERSONAL ACADEMICO"
  );
  const isVicerrectorAcademicoGeneral = roles.some(
    (rol) => rol.rol_nombre === "VICERRECTOR ACADEMICO GENERAL"
  );

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "rgb(206, 206, 206)" }}
        dark
        expand="md"
        {...args}
      >
        {/* Contenedor flexible para alinear el ícono y la imagen */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Dropdown del ícono */}
          <UncontrolledDropdown
            isOpen={isIconDropdownOpen}
            toggle={toggleIconDropdown}
          >
            <DropdownToggle
              tag="div"
              style={{
                fontSize: "60px", // Tamaño reducido del ícono
                marginRight: "10px",
                cursor: "pointer",
                padding: "10px",
                color: "rgb(255, 255, 255)", // Color personalizado para el ícono
                marginBottom: "10px",
              }}
            >
              <FaIcons.FaRegPlusSquare />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Opciones</DropdownItem>
              {isAdmin && (
                <DropdownItem onClick={() => handleNavigate("/users")}>
                  Registrar nuevo usuario
                </DropdownItem>
              )}
              <UncontrolledDropdown
                inNavbar
                isOpen={isRecategorizacionDropdownOpen}
                toggle={toggleRecategorizacionDropdown}
              >
                <DropdownToggle nav caret style={{ marginLeft: "1rem" }}>
                  Recategorización docente
                </DropdownToggle>
                <DropdownMenu>
                  {isVicerrectorAcademicoGeneral && (
                    <DropdownItem
                      onClick={() => handleNavigate("/convocatoria")}
                    >
                      Convocatoria
                    </DropdownItem>
                  )}
                  {isPersonalAcademico && (
                    <DropdownItem
                      onClick={() => handleNavigate("/postulacion")}
                    >
                      Postulación
                    </DropdownItem>
                  )}
                  {isVicerrectorAcademicoGeneral && (
                    <DropdownItem onClick={() => handleNavigate("/comision")}>
                      Comisión
                    </DropdownItem>
                  )}
                  {isComision && (
                    <DropdownItem
                      onClick={() => handleNavigate("/calificacion")}
                    >
                      Calificación
                    </DropdownItem>
                  )}
                  {(isComision || isPersonalAcademico) && (
                    <DropdownItem onClick={() => handleNavigate("/reporte")}>
                      Reporte
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown
                inNavbar
                isOpen={isMasOpcionesDropdownOpen}
                toggle={toggleMasOpcionesDropdown}
              >
                {/**
                <DropdownToggle nav caret style={{ marginLeft: "1rem" }}>
                  Más Opciones
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Subopción 1</DropdownItem>
                  <DropdownItem>Subopción 2</DropdownItem>
                  <DropdownItem>Subopción 3</DropdownItem>
                </DropdownMenu> */}
              </UncontrolledDropdown>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* Imagen del logo */}
          <NavbarBrand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")} // Navegación manual
          >
            <img
              src={logo}
              alt="Home"
              style={{ width: "300px", marginRight: "10px" }}
              onClick={() => navigate("/")}
            />
          </NavbarBrand>
        </div>

        <NavbarToggler onClick={toggleNavbar} style={{ height: "100%" }} />
        <Collapse isOpen={isOpen} navbar style={{ height: "100%" }}>
          <Nav className="ms-auto" navbar style={{ height: "100%" }}>
            {/* Fragmento del navbar en el lado derecho */}
            <div
              style={{
                backgroundColor: "rgb(100, 100, 100)",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                marginLeft: "10px",
                height: "100%",
              }}
            >
              <img
                src={configImg}
                alt="First"
                style={{ width: "40px", marginRight: "10px" }}
              />
              <img
                src={user}
                alt="Second"
                style={{ width: "45px", marginRight: "10px" }}
              />
              <span
                style={{ color: "white", marginRight: "10px" }}
              >{`${nombreUsuario?.usuario_primerapellido} ${nombreUsuario?.usuario_segundoapellido} ${nombreUsuario?.usuario_primernombre} ${nombreUsuario?.usuario_segundonombre}`}</span>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ color: "white" }}>
                  Opciones
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={() => {
                      navigate("/change-password");
                    }}
                  >
                    Cambiar contraseña
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      Cookies.remove("token");
                      Cookies.remove("centrocostos-com");
                      Cookies.remove("id-com");
                      Cookies.remove("type-com");
                      window.location.reload();
                    }}
                  >
                    Cerrar sesión
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarNav;
