import React, { useContext, useState } from 'react';
import { urlBase } from '../../../endpoints';
import { mostrarCuadroDialogo } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';

export default function Ajustes() {

    const { miUsuario } = useContext(AuthContext);
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    //MODIFICAR CONTRASEÑA
    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${urlBase}/usuarios/changePassword/${miUsuario.id_usuario}/${password}/${newPassword}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: miUsuario.id_usuario,
                nombre: miUsuario.nombre,
                apellidos: miUsuario.apellidos,
                nombre_usuario: miUsuario.nombre_usuario,
                telefono: miUsuario.telefono,
                id_departamento: miUsuario.id_departamento,
                tipo_usuario: miUsuario.tipo_usuario,
                activo: miUsuario.activo,
                password: miUsuario.password
            })
        });
        const content = await response.json();
        if (response.ok) {
            (document.getElementById("formChangePassword") as HTMLFormElement).reset();
            mostrarCuadroDialogo("Contraseña actualizada", "Contraseña actualizada correctamente.", "success", 3000);

        } else if (response.status === 400) {
            if (content.message === "Contraseña actual incorrecta") {
                mostrarCuadroDialogo("Error", "Contraseña actual incorrecta.", "error", 3000);
            }
        } else {
            mostrarCuadroDialogo("Error", "No se ha podido actualizar la contraseña.", "error", 3000);
        }
    }

    return (
        <>
            <div>
                <br />
                <h2>Cambiar contraseña de {miUsuario.nombre}</h2>
                <div className="formChangePassword">
                    <form id="formChangePassword" className="form-signin" onSubmit={submit}>
                        <input required maxLength={50} type="password" id="inputPassword" className="form-control" placeholder="Contraseña actual" onChange={e => setPassword(e.target.value)} /><br />
                        <input required maxLength={50} type="password" id="inputNewPassword" className="form-control" placeholder="Nueva contraseña" onChange={e => setNewPassword(e.target.value)} /><br />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Cambiar contraseña <i className="fa-solid fa-key"></i></button>
                    </form>
                </div>
            </div>
        </>
    )
}