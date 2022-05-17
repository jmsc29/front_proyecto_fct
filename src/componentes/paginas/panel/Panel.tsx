import React, { useContext, useState } from 'react';
import { urlBase } from '../../../endpoints';
import Usuario from '../../../models/Usuario';
import AuthContext from '../../context/AuthContext';

export default function Panel() {

    const { miUsuario } = useContext(AuthContext);

    const [fecha, setFecha] = useState();
    const [hora, setHora] = useState();
    const [tipo, setTipo] = useState();
    const [id_usuario, setIdUsuario] = useState();
    const [usuario, setUsuario] = useState<Usuario>();




    const marcarEntrada = async (usuarioActual: Usuario) => {
        var date = new Date();
        var fechaHoy = date.toISOString().split("T")[0];
        var horaActual = date.toISOString().split("T")[1].split(".")[0];

        const responseAux = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const contentAux = await responseAux.json();

        console.log("Fecha: " + fechaHoy);
        console.log("Hora: " + horaActual);
        const response = await fetch(`${urlBase}/registros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fecha: fechaHoy,
                hora: horaActual,
                tipo: true,
                id_usuario: contentAux.id_usuario,
                usuario: usuarioActual
            })
        });
        console.log(response);
        const content = await response.json();
        //console.log(content);

        console.log('Entrada');
    }

    const marcarSalida = async (usuarioActual: Usuario) => {
        var date = new Date();
        var fechaHoy = date.toISOString().split("T")[0];
        var horaActual = date.toISOString().split("T")[1].split(".")[0];

        const responseAux = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const contentAux = await responseAux.json();

        console.log("Fecha: " + fechaHoy);
        console.log("Hora: " + horaActual);
        const response = await fetch(`${urlBase}/registros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fecha: fechaHoy,
                hora: horaActual,
                tipo: false,
                id_usuario: contentAux.id_usuario,
                usuario: usuarioActual
            })
        });
        console.log(response);
        const content = await response.json();
        //console.log(content);

        console.log('Salida');
    }

    return (
        <>
            <h2>Bienvenido {miUsuario.nombre}</h2>
            <button onClick={() => marcarEntrada(miUsuario)}>Marcar entrada</button>
            <button onClick={() => marcarSalida(miUsuario)}>Marcar salida</button>
        </>
    )
}