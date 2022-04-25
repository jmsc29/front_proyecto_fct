import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { urlBase } from '../../endpoints';

    /*const useAuth = () => {
        const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
        return cookies.jwt;
    };

    const [nombre, setNombre] = useState();

    useEffect(() => {
        (
          async () => {
            const response = await fetch(`${urlBase}/user`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
    
            const content = await response.json();
            setNombre(content.nombre);    
          }
        )();
      });

    const logout = async () => {
        await fetch(`${urlBase}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
    }

    const NavBar = () => {
        return nombre ?
            (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item active">
                                    <Link className="navbar-brand" to="/login" onClick={logout}>Cerrar sesión</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            ) :
            (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item active">
                                    <Link className="navbar-brand" to="/login">Iniciar sesión</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            )
    };

export default NavBar;*/


export default function NavBar(){

    const [nombre, setNombre] = useState();
    //const [nombre, setNombre] = useContext(AuthContext);

    useEffect(() => {
        (
          async () => {
            const response = await fetch(`${urlBase}/user`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
    
            const content = await response.json();
            setNombre(content.nombre);    
          }
        )();
      });

    const logout = async () => {
        await fetch(`${urlBase}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
    }
    

    return nombre ?
            (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item active">
                                    <Link className="navbar-brand" to="/login" onClick={logout}>Cerrar sesión</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            ) :
            (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <div>
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item active">
                                    <Link className="navbar-brand" to="/login">Iniciar sesión</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            )
}