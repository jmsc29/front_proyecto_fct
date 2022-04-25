import React, { SyntheticEvent, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { urlBase } from '../../../endpoints';
import AuthContext from '../../context/AuthContext';
import './Login.css';
import Cookies from 'js-cookie';


export default function Login() {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [redirect, setRedirect] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const { miUsuario, setMiUsuario } = useContext(AuthContext);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`${urlBase}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', //para extraer las cookies generadas en el back y mantener la sesión abierta
            body: JSON.stringify({
                email,
                password
            })
        });
        const content = await response.json();
        if (response.ok) {
            setRedirect(true);
            console.log('valor cookies al loguear ' + cookies.jwt);

            //const authToken = 'fdsojfspodijfosfjho';
            //setAuthToken(authToken);
            //Cookies.set('token', authToken);
            //props.setNombre(content.nombre);
        } else {
            document.forms["login_form"].reset();
            swal({
                title: "Error",
                text: "Credenciales inválidas",
                icon: "error",
                buttons: ['Ok'],
                timer: 2500,

            });
        }
    }


    if (redirect) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            <div className="App">
                <form className="form-signin" id="login_form" onSubmit={submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required onChange={e => setPassword(e.target.value)} /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Iniciar sesión</button>
                    <p className="mt-5 mb-3 text-muted">&copy;JMSaez</p>
                </form>
            </div>
        </>
    );
}