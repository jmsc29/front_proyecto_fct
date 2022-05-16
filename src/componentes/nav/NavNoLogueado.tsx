import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Nav.css"

export default function NavLogueado() {

    const isActiveStyle = {
        fontWeight: 'bold'
      };

    return(
        <nav className="compNav navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/" data-toggle="collapse" data-target=".navbar-collapse.show">Inicio</NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="navbar-brand text-success" style={({ isActive }) => isActive ? isActiveStyle : {}} to="/login" data-toggle="collapse" data-target=".navbar-collapse.show">Iniciar sesión</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    )
}