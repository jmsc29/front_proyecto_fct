import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function Panel(){
  
    const { miUsuario } = useContext(AuthContext);

    return (
        <>
            <h2>Bienvenido {miUsuario.nombre}</h2>
        </>
    )
}