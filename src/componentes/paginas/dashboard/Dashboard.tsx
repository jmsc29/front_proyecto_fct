import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import { useFetch } from '../../../hooks/useFetch';
import swal from 'sweetalert';
import Registro from '../../../models/Registro';
import { mostrarCuadroDialogo, toastLogueado } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';
import DataTable, { createTheme } from 'react-data-table-component';
import "styled-components"
import Usuario from '../../../models/Usuario';
import reportWebVitals from '../../../reportWebVitals';
import Loading from '../../loading/Loading';
import './Dashboard.css'

export default function Dashboard() {

    const [registros, setRegistros] = useState([]);
    const { setRegistroEditar } = useContext(AuthContext);
    const { setFechaRegistros } = useContext(AuthContext);
    const [fechaAux, setFechaAux] = useState<string>();
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();

    //Editar registro
    const submitEditar = async (id_registro: number) => {
        const response = await fetch(`${urlBase}/registros/${id_registro}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const content = await response.json();
        if (response.ok) {
            setRegistroEditar(content);
            navigate("/editarRegistro/" + id_registro);
        }

    }

    //Eliminar registro
    const submitEliminar = async (id_registro: number, id_usuario: number) => {
        const response = await fetch(`${urlBase}/user/${id_usuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const content = await response.json();
        const nombre = content.nombre + " " + content.apellidos;

        swal({
            title: `¿Estás seguro de eliminar el registro de ${nombre}?`,
            text: "Una vez que lo elimines no podrás recuperar los datos",
            icon: "warning",
            buttons: ["No", "Si"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = fetch(`${urlBase}/registros/${id_registro}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    swal("Registro eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Operación cancelada");
                }
            });
    }

    //Opciones de la tabla
    const opcionesPagination = {
        rowsPerPageText: 'Elementos por página',
        rangeSeparatorText: 'de'
    }

    createTheme('customStyles', {
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
        background: {
            default: '#f5f5dc',
        },
        context: {
            background: '#d7d7a8',
            text: '#000000',
        },
        divider: {
            default: '#073642',
        },
    }, 'light');


    const showData = async () => {
        const response = await fetch(`${urlBase}/registros`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        setRegistros(data);
        setPending(false);
    }

    useEffect(() => {
        showData();
    }, [registros])

    const columns = [
        {
            keyField: row => row.id_registro,
            name: "Nombre",
            selector: row => row.usuario.nombre + " " + row.usuario.apellidos,
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => row.fecha.split(" ")[0].split("/")[2] + "-" + row.fecha.split(" ")[0].split("/")[1] + "-" + row.fecha.split(" ")[0].split("/")[0],
        },
        {
            name: "Hora",
            selector: row => row.hora,
            sortable: true
        },
        {
            name: "Tipo",
            selector: row => row.tipo ? "Entrada" : "Salida",
            sortable: true
        },
        {
            name: "Editar",
            cell: (row) => <button type="button" className="btn btn-primary" onClick={() => submitEditar(row.id_registro)}><i className="fa-solid fa-pen-to-square"></i></button>,
        }
        ,
        {
            name: "Eliminar",
            cell: (row) => <button type="button" className="btn btn-danger" onClick={() => submitEliminar(row.id_registro, row.id_usuario)}><i className="fa-solid fa-trash"></i></button>,
        }
    ]

    //Acción al pulsar el botón para mostrar los registros de un mes en concreto
    const consultarRegistros = async (e) => {
        e.preventDefault();
        setFechaRegistros(fechaAux);
        navigate("/dashboard/consulta");
    }

    return (
        <>
            <div className='contenedor'>
                <div className="formDashboard">
                    <form id="registroUsuarioFormEditar" className="form-signin" onSubmit={consultarRegistros}>
                        <h1 className="h3 mb-3 font-weight-normal">Registros de un mes</h1>
                        <input required type="month" id="inputIdRegistro" className="form-control" placeholder="Fecha" onChange={e => setFechaAux(e.target.value)} /><br />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Mostrar registros</button>
                    </form>
                </div>
                <div className='tablaDashboard'>
                    <DataTable
                        columns={columns}
                        data={registros}
                        pagination
                        paginationComponentOptions={opcionesPagination}
                        progressPending={pending}
                        progressComponent={<Loading />}
                        noDataComponent="No hay registros del día de hoy."
                        title="Registros"
                        persistTableHead
                        theme="customStyles"
                    />
                </div>
            </div>
        </>
    )
}