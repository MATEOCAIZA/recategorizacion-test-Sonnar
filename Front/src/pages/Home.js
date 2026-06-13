import { Box } from "@mui/material";
import logo from "../assets/espe.png";

const Home = () => {
    return (
        <Box
            className="home"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1 style={{ textAlign: "center", marginTop: "5rem",marginBottom: "5rem" }}>Bienvenido al sistema de Promoción Docente de</h1>
            <img src={logo} alt="logo" />
        </Box>
    );
};

export default Home;