import React, { SyntheticEvent, useState } from 'react';
import { urlBase } from '../../../endpoints';
import './Registro.css';

export default function Registro() {

    const [nombre, setNombre] = useState<string>();
    const [apellidos, setApellidos] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [telefono, setTelefono] = useState<string>();
    const [departamento, setDepartamento] = useState<string>();
    const [password, setPassword] = useState<string>();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${urlBase}/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre,
                apellidos,
                email,
                telefono,
                departamento,
                password
            })
        });

    }

    return (
        <>
            <div className="App">
                <form className="form-signin" onSubmit={submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
                    <input type="nombre" id="inputNombre" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} /><br />
                    <input type="apellidos" id="inputApellidos" className="form-control" placeholder="Apellidos" onChange={e => setApellidos(e.target.value)} /><br />
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} /><br />
                    <input type="telefono" id="inputTelefono" className="form-control" placeholder="Teléfono" onChange={e => setTelefono(e.target.value)} /><br />
                    <input type="departamento" id="inputDepartamento" className="form-control" placeholder="Departamento" onChange={e => setDepartamento(e.target.value)} /><br />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required onChange={e => setPassword(e.target.value)} /><br />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
                    <p className="mt-5 mb-3 text-muted">&copy;JMSaez</p>
                </form>
            </div>
        </>
    );
}