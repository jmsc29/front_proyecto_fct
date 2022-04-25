import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import AuthContext from '../../context/AuthContext';

export default function Dashboard(){

    var aux;
    var aux2;
    let contenido;
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const { miUsuario, setMiUsuario } = useContext(AuthContext);
    const [nombre, setNombre] = useState();

    console.log('cookie ' + cookies.jwt);
    console.log('contenido ' + miUsuario);

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

      contenido = (
        <h2>Hola {nombre}</h2>
    )
    

    return (
        <>
            {contenido}
        </>
    )
}