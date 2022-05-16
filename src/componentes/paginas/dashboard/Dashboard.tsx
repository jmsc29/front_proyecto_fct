import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { urlBase } from '../../../endpoints';
import { useFetch } from '../../../hooks/useFetch';


export default function Dashboard(){

    const { miUsuario } = useContext(AuthContext);

    const { setUsuarioEditar } = useContext(AuthContext);

    const res = useFetch(`${urlBase}/registros`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = res.response;

    console.log(data);

    if (Array.isArray(data)) {
        var result = data.map((element) => {
            return element;
        });
    }

    return (
        <>
            <h2>Dashboard</h2><br /><br />
            <table id="dtBasicExample" className="table table-striped table-bordered table-sm">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Hora</th>
                        {/* <th scope="col">Apellidos</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Tipo de usuario</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th> */}
                    </tr>
                </thead>
                <tbody>
                    {result && result.map(row => {
                        return (
                            <tr>
                                <th scope="row" key={row.id_registro}>{row.id_registro}</th>
                                <td>{row.fecha.split(["T"])[0]}</td>
                                <td>{row.hora.hours + ":" + row.hora.minutes + ":" + row.hora.seconds}</td>
                                {/* <td>{row.apellidos}</td>
                                <td>{row.telefono}</td>
                                <td>{row.departamento}</td>
                                <td>{row.tipo_usuario}</td> */}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br /> <br />
        </>
    )

    return (
        <>
            <h2>Dashboard</h2><br/><br/>
            <table className="table table-striped table-bordered table-sm">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Tipo de usuario</th>
                        <th scope="col">Registro</th>
                        <th scope="col">Hora</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </>
    )
}