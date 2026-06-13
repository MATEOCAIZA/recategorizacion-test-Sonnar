{/**import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const Sidebar = ({ toggleSidebar, isVisible }) => {
    return (
        <div className={`sidebar bg-light ${isVisible ? 'visible' : 'hidden'}`} style={{ display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
            <button onClick={toggleSidebar} className={`toggle-button ${isVisible ? '' : 'collapsed'}`}>
                {isVisible ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
            </button>
            <ul>
                <li>
                    <NavLink to="/home" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaHome className='icon' /> <span className='text'>Inicio</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/approvals"} className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaClipboardCheck className='icon' /> <span className='text'>Aprobaciones</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/supplier" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaTruckMoving className='icon' /> <span className='text'>Proveedores</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaBarcode className='icon' /> <span className='text'>Productos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/preorder" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaBalanceScaleLeft className='icon' /> <span className='text'>Preórdenes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/preordertemplate" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaBookmark className='icon' /> <span className='text'>Plantillas Preorden</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/purchaseorder" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaClipboardList className='icon' /> <span className='text'>Órdenes de compras</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users" className='text-dark rounded py-2 w-100 px-3' exacr activeClassName='active'>
                        <FaIcons.FaUser className='icon' /> <span className='text'>Usuarios</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/requirements" className='text-dark rounded py-2 w-100 px-3' exact activeClassName='active'>
                        <FaIcons.FaFileAlt className='icon' /> <span className='text'>Requerimientos</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar; */}