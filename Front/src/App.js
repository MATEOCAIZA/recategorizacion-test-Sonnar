import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.scss';

import config from "../src/config";

import Calificacion from './pages/Calificacion';
import ChangePassword from './pages/ChangePassword';
import Comision from './pages/Comision';
import Convocatoria from './pages/Convocatoria';
import Home from './pages/Home';
import Login from './pages/Login';
import NuevaComision from './pages/NuevaComision';
import NuevaConvocatoria from './pages/NuevaConvocatoria';
import Postulacion from './pages/Postulacion';
import PostulacionCalificacion from './pages/PostulacionCalificacion';
import Reporte from './pages/Reporte';
import Users from './pages/Users';

import NavbarNav from './components/NavbarNav';

import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch(`${config.apiBaseUrl}/is-verify`, {
        method: "GET",
        headers: { token: Cookies.get('token') }
      });

      const parseRes = await response.json();

      if (parseRes === true) {
        const decodedToken = jwtDecode(Cookies.get('token'));
        const userType = decodedToken.type;
        setIsAuthenticated(true);
        setUserType(userType);
      } else {
        setIsAuthenticated(false);
        setUserType(null);
      };
    } catch (error) {
      console.error(error.message);
    } finally {
      setAuthChecked(true);
    };
  };

  useEffect(() => {
    isAuth();
  }, [Cookies.get('token')]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        authChecked={authChecked}
        handleLogin={handleLogin}
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

function AppContent({ isAuthenticated, setAuth, authChecked, handleLogin, sidebarVisible, toggleSidebar }) {
  const location = useLocation();

  return (
    <div className="flex">
      <div className={`content w-100 ${sidebarVisible ? 'expanded' : 'collapsed'}`}>
        {isAuthenticated && <NavbarNav />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" replace />} />
          <Route path='/calificacion' element={isAuthenticated ? <Calificacion /> : <Navigate to={"/"} />} />
          <Route path='/change-password' element={isAuthenticated ? <ChangePassword /> : <Navigate to={"/"} /> } />
          <Route path='/comision' element={isAuthenticated ? <Comision /> : <Navigate to={"/"} />} />
          <Route path='/convocatoria' element={isAuthenticated ? <Convocatoria /> : <Navigate to={"/"} />} />
          <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path='/login' element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to={location.state?.from || '/'} replace />} />
          <Route path='/nuevacomision' element={isAuthenticated ? <NuevaComision /> : <Navigate to='/' />} />
          <Route path='/nuevaconvocatoria' element={isAuthenticated ? <NuevaConvocatoria /> : <Navigate to='/' />} />
          <Route path='/postulacion' element={isAuthenticated ? <Postulacion /> : <Navigate to={'/'} />} />
          <Route path='/postulacion-calificacion/:id' element={isAuthenticated ? <PostulacionCalificacion /> : <Navigate to={'/'} />} />
          <Route path='/reporte' element={isAuthenticated ? <Reporte /> : <Navigate to={'/'} />} />
          <Route path='/users' element={isAuthenticated ? <Users /> : <Navigate to={'/'} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;