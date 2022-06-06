import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import Usuario from '../../../models/Usuario';
import { mostrarCuadroDialogo, toastLogueado } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';

export default function EditarEspecifico() {

    const { registroEditar, setRegistroEditar } = useContext(AuthContext);
    var nombre_usuario = registroEditar.usuario.nombre;

    const [id_registro, setIdRegistro] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [fecha, setFecha] = useState<string>();
    const [hora, setHora] = useState<string>();
    const [tipo, setTipo] = useState<string>();
    const [id_usuario, setIdUsuario] = useState<string>();
    const [usuario, setUsuario] = useState<Usuario>();

    const navigate = useNavigate();

    //Establezco las variables correspondientes a los datos del registro de manera inicial
    //esto es necesario porque se actualiza al cambiar el texto de algún campo del formulario,
    //pero si no modifico ninguno no tendría valores iniciales y daría error
    if (!id_registro) {
        setIdRegistro(registroEditar.id_registro)
    }

    if (!nombre) {
        setNombre(registroEditar.usuario.nombre + " " + registroEditar.usuario.apellidos)
    }

    if (!hora) {
        setHora(registroEditar.hora)
    }

    if (!fecha) {
        var miFecha = registroEditar.fecha.split(" ")[0].split("/")[2] + "-" + registroEditar.fecha.split(" ")[0].split("/")[1] + "-" + registroEditar.fecha.split(" ")[0].split("/")[0];
        setFecha(miFecha);
    }

    if (!tipo) {
        registroEditar.tipo ? setTipo("Entrada") : setTipo("Salida");
    }

    if (!id_usuario) {
        setIdUsuario(registroEditar.id_usuario)
    }

    if (!usuario) {
        setUsuario(registroEditar.usuario)
    }

    //Editar el registro
    const submit = async (e) => {
        e.preventDefault();
        var auxTipo = tipo == 'Entrada' ? true : false;

        const response = await fetch(`${urlBase}/registros/${registroEditar.id_registro}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_registro,
                fecha,
                hora,
                auxTipo,
                id_usuario,
                usuario
            })
        });
        if (response.ok) {
            setRegistroEditar(null);
            mostrarCuadroDialogo("Completado", "Registro actualizado con éxito", "success", 10000);
            return navigate("/dashboard");

        } else {
            mostrarCuadroDialogo("Error", "No se ha podido completar la modificación", "error", 4000);
        }

    }

    return (
        <>
            <h2>Modificando datos del registro de {nombre_usuario}</h2><br /><br />
            <form id="registroUsuarioFormEditar" className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
                <input required type="text" disabled id="inputIdRegistro" defaultValue={`Id Registro:  ${id_registro}`} className="form-control" placeholder="Id registro" onChange={e => setIdRegistro(e.target.value)} /><br />
                <input required type="text" disabled id="inputIdUsuario" defaultValue={`Id Usuario:  ${id_usuario}`} className="form-control" placeholder="Id usuario" onChange={e => setIdUsuario(e.target.value)} /><br />
                <input required type="text" disabled id="inputNombre" defaultValue={`Nombre:  ${nombre}`} className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} /><br />
                <input required type="date" id="inputFecha" defaultValue={fecha} className="form-control" placeholder="Fecha" onChange={e => setFecha(e.target.value)} /><br />
                <input required type="time" id="inputHora" defaultValue={hora} className="form-control" placeholder="Hora" onChange={e => setHora(e.target.value)} /><br />
                <input required type="text" disabled id="inputTipo" defaultValue={`Tipo:  ${tipo}`} className="form-control" placeholder="Tipo" onChange={e => setTipo(e.target.value)} /><br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Actualizar</button>
            </form>
        </>
    )
}