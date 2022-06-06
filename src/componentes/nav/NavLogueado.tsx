import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { urlBase } from '../../endpoints';
import AuthContext from '../context/AuthContext';
import { acercaDe, toastDesLogueado } from '../../utils/Utils';
import "./Nav.css"

export default function NavLogueado() {

    const { miUsuario, setMiUsuario } = useContext(AuthContext);

    const isActiveStyle = {
        fontWeight: 'bold'
    };

    const logout = async () => {
        window.localStorage.clear();
        Cookies.remove('jwt');
        setMiUsuario(null);
        await fetch(`${urlBase}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        toastDesLogueado();
        return <Link to="/login" />
    }

    return (
        <nav className="compNav navbar navbar-expand-lg navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/" data-toggle="collapse" data-target=".navbar-collapse.show">Inicio</NavLink>
                    </li>

                    {miUsuario.tipo_usuario === 'Admin' ?
                        <li className="nav-item">
                            <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/dashboard" data-toggle="collapse" data-target=".navbar-collapse.show">Panel de marcajes</NavLink>
                        </li> : <></>}

                    <li className="nav-item">
                        <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/panel" data-toggle="collapse" data-target=".navbar-collapse.show">Realizar marcaje</NavLink>
                    </li>

                    {miUsuario.tipo_usuario === 'Admin' ?
                        <li className="nav-item">
                            <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/registro" data-toggle="collapse" data-target=".navbar-collapse.show">Registrar empleado</NavLink>
                        </li> : <></>}

                    {miUsuario.tipo_usuario === 'Admin' ?
                        <li className="nav-item">
                            <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/editarEmpleado" data-toggle="collapse" data-target=".navbar-collapse.show">Empleados</NavLink>
                        </li> : <></>}

                    {miUsuario.tipo_usuario === 'Admin' ?
                        <li className="nav-item">
                            <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/altaDepartamento" data-toggle="collapse" data-target=".navbar-collapse.show">Departamentos</NavLink>
                        </li> : <></>}

                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="navbar-brand text-secundary" onClick={acercaDe} data-toggle="collapse" data-target=".navbar-collapse.show">Acerca de</a>
                    </li>
                    <li className="nav-item">
                        <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/ajustes" data-toggle="collapse" data-target=".navbar-collapse.show">Cambiar contraseña</NavLink>
                    </li>
                    <li className="nav-item">
                        <Link className="navbar-brand text-danger" to="/login" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={logout}>Cerrar sesión</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}