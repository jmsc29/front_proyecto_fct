import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function Ajustes(){
  
    const { miUsuario } = useContext(AuthContext);

    return (
        <>
            <h2>Ajustes de {miUsuario.nombre}</h2>
        </>
    )
}