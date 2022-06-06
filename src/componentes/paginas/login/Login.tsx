import React, { useContext, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import { toastLogueado, mostrarCuadroDialogo } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';
import './Login.css';

export default function Login() {

    //variables recogidas por el formulario de login
    const [nombreUsuario, setNombreUsuario] = useState<string>();
    const [password, setPassword] = useState<string>();

    //booleana para que en el caso de que loguee redireccione al dashboard
    const [redirect, setRedirect] = useState(false);

    //usuario en cuestión
    const { setMiUsuario } = useContext(AuthContext);

    //variable para controlar que mientras se esté haciendo la petición muestre un spinner para saber que se está esperando una respuesta
    const { setLoad } = useContext(AuthContext);

    //sirve para abortar la petición tras un tiempo que yo le especifique
    const abortController = useRef(null);

    //al cargar el login limpia al almacenamiento interno del navegador
    window.localStorage.clear();

    //Al dar click a iniciar sesión
    const submit = async (e) => {
        e.preventDefault();
        setLoad(false);

        setTimeout(() => {
            cancelRequest();
        }, 60000); //Le pongo un minuto de timeOut para asegurarme de que tenga tiempo de sobra

        try {
            abortController.current = new AbortController();
            const response = await fetch(`${urlBase}/login`, {
                signal: abortController.current.signal,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', //para extraer las cookies generadas en el back y mantener la sesión abierta
                body: JSON.stringify({
                    nombre_usuario: nombreUsuario,
                    password
                })
            });
            const content = await response.json();
            if (response.ok) {
                toastLogueado();
                setRedirect(true);
                setMiUsuario(content);
                window.localStorage.setItem('user', content);

            } else if (response.status === 400) {
                if (content.message === "Contraseña incorrecta") {
                    mostrarCuadroDialogo("Error", "Contraseña incorrecta.", "error", 3000);
                } else if (content.message === "Credenciales inválidas") {
                    mostrarCuadroDialogo("Error", "Usuario no encontrado.", "error", 3000);
                } else if (content.message === "Usuario no activo") {
                    mostrarCuadroDialogo("Error", "Usuario no activo, por favor, contacta con tu empresa.", "warning", 4500);
                }
                else {
                    mostrarCuadroDialogo("Error", "No se ha podido establecer conexión con la base de datos.", "warning", 4500);
                }
            } else {
                mostrarCuadroDialogo("Error", "Credenciales inválidas.", "error", 3000);
            }
            setLoad(true);
        } catch (error) {
            if (error.message === 'The user aborted a request.') {
                mostrarCuadroDialogo("Error", "Se ha agotado el tiempo de conexión. \nPruebe a intentarlo de nuevo.", "warning", 4500);
            } else {
                mostrarCuadroDialogo("Error", "No se ha podido conectar con el servidor.", "warning", 4500);
            }
            setLoad(true);
        }
    }

    //Ejecución una vez se termina el timeOut
    const cancelRequest = () => {
        abortController.current && abortController.current.abort();
        setLoad(true);
    }

    //Si el login es satisfactorio establezco la variable global 'setLoad' a 'true' para que termine la animación del gif 'cargando' y redirijo al panel
    if (redirect) {
        setLoad(true);
        return <Navigate to="/panel" />;
    }

    return (
        <>
            <div className="App">
                <form className="form-signin" id="login_form" onSubmit={submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    <input type="text" id="inputNombreUsuario" className="form-control" placeholder="Nombre de usuario" required onChange={e => setNombreUsuario(e.target.value)} /><br />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required onChange={e => setPassword(e.target.value)} /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Iniciar sesión</button>
                </form>
            </div>
        </>
    );
}