import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext';
import DataTable, { createTheme } from 'react-data-table-component';
import "styled-components"
import "./Editar.css"
import Loading from '../../loading/Loading';

export default function Editar() {

    const [pending, setPending] = useState(true);
    const { setUsuarioEditar } = useContext(AuthContext);
    const { setDepartamentoEditar } = useContext(AuthContext);
    const [empleados, setEmpleados] = useState([]);

    //Opciones de la tabla
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
        const response = await fetch(`${urlBase}/usuarios`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setEmpleados(data);
        setPending(false);
    }

    useEffect(() => {
        showData();
    }, [empleados])

    const columns = [
        {
            keyField: row => row.id_usuario,
            name: "Id",
            selector: row => row.id_usuario,
            sortable: true
        },
        {
            name: "Usuario",
            selector: row => row.nombre_usuario,
            sortable: true
        },
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Apellidos",
            selector: row => row.apellidos,
            sortable: true
        },
        {
            name: "Teléfono",
            selector: row => row.telefono,
            sortable: true
        },
        {
            name: "Departamento",
            selector: row => row.departamento.nombre,
            sortable: true
        },
        {
            name: "Tipo de usuario",
            selector: row => row.tipo_usuario,
            sortable: true
        },
        {
            name: "Activo?",
            selector: row => row.activo ? "Activo" : "No activo",
            sortable: true
        },
        {
            name: "Editar",
            cell: (row) => <button type="button" className="btn btn-primary" onClick={() => submitEditar(row.id_usuario)}><i className="fa-solid fa-pen-to-square"></i></button>,
        }
        ,
        {
            name: "Eliminar",
            cell: (row) => <button type="button" className="btn btn-danger" onClick={() => submitEliminar(row.id_usuario, row.nombre, row.apellidos)}><i className="fa-solid fa-trash"></i></button>,
        }
    ]

    const opcionesPagination = {
        rowsPerPageText: 'Elementos por página',
        rangeSeparatorText: 'de'
    }

    const navigate = useNavigate();

    //Editar un empleado
    const submitEditar = async (id_usuario: number) => {
        const response = await fetch(`${urlBase}/user/${id_usuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const content = await response.json();
        if (response.ok) {
            const response = await fetch(`${urlBase}/departamentos/${content.id_departamento}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setDepartamentoEditar(data);
            setUsuarioEditar(content);
            navigate("/editarEmpleado/" + id_usuario);
        }
    }

    //Eliminar un empleado
    const submitEliminar = async (id_usuario: number, nombre: string, apellidos: string) => {
        swal({
            title: `¿Estás seguro de eliminar a ${nombre} ${apellidos}?`,
            text: "Una vez que lo elimines no podrás recuperar los datos",
            icon: "warning",
            buttons: ["No", "Si"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = fetch(`${urlBase}/usuarios/${id_usuario}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                    });
                    swal("Empleado eliminado", {
                        icon: "success",
                    });
                } else {
                    swal("Operación cancelada");
                }
            });
    }

    return (
        <>
            <div className='tablaEmpleados'>
                <DataTable
                    columns={columns}
                    data={empleados}
                    pagination
                    paginationComponentOptions={opcionesPagination}
                    progressPending={pending}
                    progressComponent={<Loading />}
                    title="Editar empleados"
                    noDataComponent="No hay empleados."
                    persistTableHead
                    theme="customStyles"
                />
                <br /> <br />
            </div>
        </>
    )
}