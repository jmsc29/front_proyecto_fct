import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import Departamento from '../../../models/Departamento';
import { mostrarCuadroDialogo, toastLogueado } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';
import "./Editar.css"

export default function EditarEspecifico() {

    const { usuarioEditar, setUsuarioEditar } = useContext(AuthContext);
    const { departamentoEditar } = useContext(AuthContext);
    var nombre_usuario = usuarioEditar.nombre_usuario;
    var id_usuario = usuarioEditar.id_usuario;

    const navigate = useNavigate();

    const [nombre, setNombre] = useState<string>();
    const [apellidos, setApellidos] = useState<string>();
    const [telefono, setTelefono] = useState<string>();
    const [tipo_usuario, setTipo_usuario] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [activoAux, setActivoAux] = useState<string>();
    const [departamentoAux, setDepartamentoAux] = useState<string>();

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    //Cargo los departamentos al inicio
    const inicio = async () => {
        const response = await fetch(`${urlBase}/departamentos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const content = await response.json();
        setDepartamentos(content);
    }

    inicio();

    //Establezco las variables correspondientes a los datos del usuario de manera inicial
    //esto es necesario porque se actualiza al cambiar el texto de algún campo del formulario,
    //pero si no modifico ninguno no tendría valores iniciales y daría error
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

    if (!password) {
        setPassword(usuarioEditar.password)
    }

    if (!activoAux) {
        setActivoAux(usuarioEditar.activo ? "Activo" : "No activo")
    }

    //Editar empleado
    const submit = async (e) => {
        e.preventDefault();

        var activo = activoAux == "Activo" ? true : false;
        var departamentoActual = departamentoAux;
        if (!departamentoAux) {
            departamentoActual = departamentoEditar.nombre;
        }

        var id_departamento_elegido = departamentos.find(a => a.nombre === departamentoActual).id_departamento;


        const response = await fetch(`${urlBase}/usuarios/${usuarioEditar.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario,
                nombre,
                apellidos,
                nombre_usuario,
                telefono,
                id_departamento: id_departamento_elegido,
                tipo_usuario,
                activo,
                password
            })
        });
        const content = await response.json();
        if (response.ok) {
            setUsuarioEditar(null);
            mostrarCuadroDialogo("Completado", "Empleado actualizado con éxito", "success", 10000);
            return navigate("/editarEmpleado");

        } else {
            mostrarCuadroDialogo("Error", "No se ha podido completar la modificación", "error", 4000);
        }
    }

    //Resetear contraseña del empleado
    const resetearPassword = async () => {
        const response = await fetch(`${urlBase}/usuarios/resetPassword/${usuarioEditar.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: usuarioEditar.id_usuario,
                nombre: usuarioEditar.nombre,
                apellidos: usuarioEditar.apellidos,
                nombre_usuario: usuarioEditar.nombre_usuario,
                telefono: usuarioEditar.telefono,
                id_departamento: usuarioEditar.id_departamento,
                tipo_usuario: usuarioEditar.tipo_usuario,
                activo: usuarioEditar.activo,
                password: usuarioEditar.password
            })
        });
        const content = await response.json();
        if (response.ok) {
            mostrarCuadroDialogo("Contraseña reseteada", "Contraseña reseteada correctamente.", "success", 3000);

        } else {
            mostrarCuadroDialogo("Error", "No se ha podido resetear la contraseña.", "error", 3000);
        }
    }

    return (
        <>
            <h2>Modificando datos de {usuarioEditar.nombre}</h2><br /><br />
            <form id="registroUsuarioFormEditar" className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Datos profesionales</h1>
                <input required maxLength={25} type="text" id="inputNombre" defaultValue={usuarioEditar.nombre} className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} /><br />
                <input required maxLength={30} type="text" id="inputApellidos" defaultValue={usuarioEditar.apellidos} className="form-control" placeholder="Apellidos" onChange={e => setApellidos(e.target.value)} /><br />
                <input type="number" required defaultValue={usuarioEditar.telefono} min="600000000" max="999999999" id="inputTelefono" pattern="[0-9]{9}" className="form-control" placeholder="Teléfono" onChange={e => setTelefono(e.target.value)} /><br />
                <select id="inputDepartamento" defaultValue={departamentoEditar.nombre} className="form-control" required onChange={e => setDepartamentoAux(e.target.value)}>
                    <option hidden>{departamentoEditar.nombre}</option>
                    {departamentos?.map(departamento => <option key={departamento.id_departamento}>{departamento.nombre}</option>)}
                </select><br />
                <select id="inputTipoUsuario" defaultValue={usuarioEditar.tipo_usuario} className="form-control" required onChange={e => setTipo_usuario(e.target.value)}>
                    <option hidden>Tipo de usuario...</option>
                    <option>Empleado</option>
                    <option>Admin</option>
                </select><br />
                <select id="inputActivo" defaultValue={usuarioEditar.activo ? "Activo" : "No activo"} className="form-control" required onChange={e => setActivoAux(e.target.value)}>
                    <option hidden>Usuario activo?...</option>
                    <option>Activo</option>
                    <option>No activo</option>
                </select><br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Actualizar <i className="fa-solid fa-pen-to-square"></i></button>
            </form>
            <div className="form-signin">
                <button className="btn btn-lg btn-warning btn-block" onClick={() => resetearPassword()}>Resetear contraseña <i className="fa-solid fa-key"></i></button>
            </div>
        </>
    )
}