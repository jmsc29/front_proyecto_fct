import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './componentes/paginas/login/Login';
import Dashboard from './componentes/paginas/dashboard/Dashboard';
import Registro from './componentes/paginas/registro/Registro';
import { urlBase } from './endpoints';
import Nav from './componentes/nav/Nav';
import Home from './componentes/paginas/home/Home';
import { Cookies, useCookies } from 'react-cookie';
import { useFetchUser } from './hooks/useFetchUser';
import Usuario from './models/Usuario';
import AuthContext from './componentes/context/AuthContext';
import PrivatesRoutes from './componentes/rutas/PrivatedRoutes';
import { MisRutas } from './componentes/rutas/MisRutas';

function App() {

  /*const [nombre, setNombre] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const { miUsuario, setMiUsuario } = useContext(AuthContext);

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


        var miUsuario = content;

        if (miUsuario.id_usuario) {
          console.log(miUsuario);
          console.log(miUsuario.id_usuario);
          console.log(miUsuario.nombre);
        }


      }
    )();
  });*/


  return (
    <>
      <div className="App">
            <Nav />
            <MisRutas />
      </div>

    </>
  );
}

export default App;
