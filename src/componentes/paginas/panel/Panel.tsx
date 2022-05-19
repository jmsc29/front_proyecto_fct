import React, { useContext } from 'react';
import { urlBase } from '../../../endpoints';
import AuthContext from '../../context/AuthContext';
import Reloj from '../reloj/Reloj';

export default function Panel() {

    const { miUsuario } = useContext(AuthContext);

    const marcarRegistro = async (tipoRegistro: boolean) => {
        var date = new Date();
        var fechaHoy = date.toISOString().split("T")[0];
        var horaActual = date.toISOString().split("T")[1].split(".")[0];

        const responseAux = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const contentAux = await responseAux.json();
        const nombreCompleto = contentAux.nombre + " " + contentAux.apellidos;

        const response = await fetch(`${urlBase}/registros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fecha: fechaHoy,
                hora: horaActual,
                nombre: nombreCompleto,
                tipo: tipoRegistro,
                id_usuario: contentAux.id_usuario,
            })
        });
        const content = await response.json();
        console.log(content);
    }

    const marcarEntrada = async () => {
        marcarRegistro(true);
    }

    const marcarSalida = async () => {
        marcarRegistro(false);
    }

    return (
        <>
            <Reloj /> <br/><br/>
            <h2>Bienvenido {miUsuario.nombre}</h2>
            <button className="btn btn-success" onClick={() => marcarEntrada()}>Marcar entrada</button><br /><br />
            <button className="btn btn-danger" onClick={() => marcarSalida()}>Marcar salida</button>
        </>
    )
}