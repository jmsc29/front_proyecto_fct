import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import { useFetch } from '../../../hooks/useFetch';
import Registro from '../../../models/Registro';
import { mostrarCuadroDialogo, toastLogueado } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';
import "./Editar.css"

export default function EditarEspecifico() {

    const { usuarioEditar, setUsuarioEditar } = useContext(AuthContext);
    var nombre_usuario = usuarioEditar.nombre_usuario;
    var id_usuario = usuarioEditar.id_usuario;

    const navigate = useNavigate();

    const [nombre, setNombre] = useState<string>();
    const [apellidos, setApellidos] = useState<string>();
    const [telefono, setTelefono] = useState<string>();
    const [tipo_usuario, setTipo_usuario] = useState<string>();
    const [departamento, setDepartamento] = useState<string>();
    const [password, setPassword] = useState<string>();

    if (!nombre) {
        setNombre(usuarioEditar.nombre)
    }

    if (!apellidos) {
        setApellidos(usuarioEditar.apellidos)
    }

    if (!telefono) {
        if (usuarioEditar.telefono) {
            setTelefono(usuarioEditar.telefono)
        }
    }

    if (!tipo_usuario) {
        setTipo_usuario(usuarioEditar.tipo_usuario)
    }

    if (!departamento) {
        setDepartamento(usuarioEditar.departamento)
    }

    if (!password) {
        setPassword(usuarioEditar.password)
    }



    //api/usuarios/:id
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${urlBase}/usuarios/${usuarioEditar.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario,
                nombre,
                apellidos,
                nombre_usuario,
                telefono,
                departamento,
                tipo_usuario,
                password
            })
        });
        const content = await response.json();
        if (response.ok) {
            setUsuarioEditar(null);
            mostrarCuadroDialogo("Completado", "Empleado actualizado con éxito", "success", 10000);
            return navigate("/editar");

        } else {
            mostrarCuadroDialogo("Error", "No se ha podido completar la modificación", "error", 4000);
        }

    }

    return (
        <>
            <h2>Modificando datos de {usuarioEditar.nombre}</h2><br /><br />
            <form id="registroUsuarioFormEditar" className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
                <input required type="text" id="inputNombre" defaultValue={usuarioEditar.nombre} className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} /><br />
                <input required type="text" id="inputApellidos" defaultValue={usuarioEditar.apellidos} className="form-control" placeholder="Apellidos" onChange={e => setApellidos(e.target.value)} /><br />
                <input type="number" required defaultValue={usuarioEditar.telefono} min="600000000" max="999999999" id="inputTelefono" pattern="[0-9]{9}" className="form-control" placeholder="Teléfono" onChange={e => setTelefono(e.target.value)} /><br />
                <select id="inputDepartamento" defaultValue={usuarioEditar.departamento} className="form-control" required onChange={e => setDepartamento(e.target.value)}>
                    <option hidden>Departamento...</option>
                    <option>Software</option>
                    <option>RRHH</option>
                    <option>Compras</option>
                    <option>Finanzas</option>
                    <option>Marketing</option>
                    <option>Dirección</option>
                </select><br />
                <select id="inputTipoUsuario" defaultValue={usuarioEditar.tipo_usuario} className="form-control" required onChange={e => setTipo_usuario(e.target.value)}>
                    <option hidden>Tipo de usuario...</option>
                    <option>Empleado</option>
                    <option>Admin</option>
                </select><br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Actualizar</button>
                <p className="mt-5 mb-3 text-muted">&copy;JMSaez</p>
            </form>
        </>
    )
}