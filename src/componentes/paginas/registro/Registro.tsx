import React, { SyntheticEvent, useState } from 'react';
import { urlBase } from '../../../endpoints';
import Departamento from '../../../models/Departamento';
import { mostrarCuadroDialogo } from '../../../utils/Utils';
import './Registro.css';

export default function Registro() {

    const [nombre, setNombre] = useState<string>();
    const [apellidos, setApellidos] = useState<string>();
    const [nombreUsuario, setNombreUsuario] = useState<string>();
    const [telefono, setTelefono] = useState<string>("957102030");
    const [tipo_usuario, setTipo_usuario] = useState<string>();
    const [departamento, setDepartamento] = useState<string>();
    const [activoAux, setActivoAux] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    const inicio = async () => {

        const response = await fetch(`${urlBase}/departamentos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const content = await response.json();
        setDepartamentos(content);
    }

    inicio();

    //Registrar un nuevo empleado
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        //Controlo que todos los campos estén rellenos
        if (departamento === 'Departamento...' || departamento == undefined) {
            mostrarCuadroDialogo("Error", "Elige un departamento", "error", 3000);
            return;
        }

        if (tipo_usuario === 'Tipo de usuario...' || tipo_usuario == undefined) {
            mostrarCuadroDialogo("Error", "Elige el tipo de usuario", "error", 3000);
            return;
        }

        if (activoAux === 'Usuario activo?...' || activoAux == undefined) {
            mostrarCuadroDialogo("Error", "Elige el tipo de usuario", "error", 3000);
            return;
        }

        var activo = activoAux == "Activo" ? true : false;

        var auxDepartamento = departamentos.find(a => a.nombre === departamento);

        const response = await fetch(`${urlBase}/usuarios/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                apellidos,
                nombre_usuario: nombreUsuario,
                telefono,
                id_departamento: auxDepartamento.id_departamento,
                departamento: auxDepartamento,
                tipo_usuario,
                password,
                activo
            })
        });
        const content = await response.json();
        if (response.ok) {
            mostrarCuadroDialogo("Registro completado correctamente", `DATOS DEL USUARIO REGISTRADO:\n
                Nombre: ${content.nombre}\n
                Apellidos: ${content.apellidos}\n
                Usuario: ${content.nombre_usuario}\n
                Contraseña: ${content.nombre_usuario}\n\n
                Le recomendamos que el usuario cambie la contraseña por motivos de seguridad\n
                `, "success", 10000);
            //Reseteo el formulario cuando los datos son correctos
            (document.getElementById("registroUsuarioForm") as HTMLFormElement).reset();
        } else {
            mostrarCuadroDialogo("Error", "No se ha podido completar el registro", "error", 4000);
        }
    }

    return (
        <>
            <div className="App">
                <form id="registroUsuarioForm" className="form-signin" onSubmit={submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
                    <input required maxLength={25} type="text" id="inputNombre" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} /><br />
                    <input required maxLength={30} type="text" id="inputApellidos" className="form-control" placeholder="Apellidos" onChange={e => setApellidos(e.target.value)} /><br />
                    <input required readOnly type="text" id="inputNombreUsuario" className="form-control" defaultValue="Usuario autogenerado" onChange={e => setNombreUsuario(e.target.value)} /><br />
                    <input type="number" defaultValue={"957102030"} required min="600000000" max="999999999" id="inputTelefono" pattern="[0-9]{9}" className="form-control" placeholder="Teléfono" onChange={e => setTelefono(e.target.value)} /><br />
                    <select id="inputDepartamento" className="form-control" required onChange={e => setDepartamento(e.target.value)}>
                        <option hidden>Departamento...</option>
                        {departamentos?.map(departamento => <option key={departamento.id_departamento}>{departamento.nombre}</option>)}
                    </select><br />
                    <select id="inputTipoUsuario" className="form-control" required onChange={e => setTipo_usuario(e.target.value)}>
                        <option hidden>Tipo de usuario...</option>
                        <option>Empleado</option>
                        <option>Admin</option>
                    </select><br />
                    <select id="inputActivo" className="form-control" required onChange={e => setActivoAux(e.target.value)}>
                        <option hidden>Usuario activo?...</option>
                        <option>Activo</option>
                        <option>No activo</option>
                    </select><br />
                    <input required readOnly defaultValue="password" type="password" id="inputPassword" className="form-control" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Registrar <i className="fa-solid fa-plus"></i></button>
                </form>
            </div>
        </>
    );
}