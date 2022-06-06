import React, { SyntheticEvent, useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { urlBase } from '../../../endpoints';
import { mostrarCuadroDialogo } from '../../../utils/Utils';
import Loading from '../../loading/Loading';
import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import './AltaDepartamento.css';

export default function AltaDepartamento() {

    const [departamento, setDepartamento] = useState<string>();
    const [departamentos, setDepartamentos] = useState([]);
    const [pending, setPending] = useState(true);

    //Dar de alta un nuevo departamento
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`${urlBase}/departamentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: departamento
            })
        });
        const content = await response.json();
        if (response.ok) {
            mostrarCuadroDialogo(
                `Departamento ${departamento} dado de alta correctamente`,
                ``,
                "success",
                10000);
            //Reseteo el formulario cuando los datos son correctos
            (document.getElementById("AltaDepartamentoForm") as HTMLFormElement).reset();
        } else if (response.status === 400) {
            if (content.message === "Departamento duplicado") {
                mostrarCuadroDialogo("Error", "Departamento duplicado.", "error", 3000);
            }
        } else { //Departamento duplicado
            mostrarCuadroDialogo("Error", "No se ha podido dar de alta el departamento", "error", 4000);
        }

    }

    //Editar un departamento
    const submitEditar = async (id_departamento: number) => {
        const { value: value } = await swal2.fire({
            title: 'Introduce el nuevo nombre del departamento',
            input: 'text',
            inputLabel: 'Departamento: ',
            inputPlaceholder: 'Nombre del departamento'
        })

        if (value) {
            const response = await fetch(`${urlBase}/departamentos/${id_departamento}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_departamento: id_departamento,
                    nombre: value,
                })
            });
            if (response.ok) {
                mostrarCuadroDialogo("Completado", "Departamento actualizado con éxito", "success", 10000);
            } else {
                mostrarCuadroDialogo("Error", "No se ha podido completar la modificación", "error", 4000);
            }
        }
    }

    //Eliminar un departamento
    const submitEliminar = async (id_departamento: number) => {
        swal({
            title: `¿Estás seguro de eliminar el departamento?`,
            text: "Una vez que lo elimines no podrás recuperar los datos",
            icon: "warning",
            buttons: ["No", "Si"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        title: `¡¡¡CUIDADO!!!`,
                        text: "SI ELIMINAS EL DEPARTAMENTO SE ELIMINARÁN TODOS LOS EMPLEADOS QUE PERTENEZCAN A ESTE DEPARTAMENTO.\nPUEDE CAMBIAR LOS EMPLEADOS DE DICHO DEPARTAMENTO A OTRO EXISTENTE EN EL CASO DE QUERER ELIMINAR EL DEPARTAMENTO.",
                        icon: "warning",
                        buttons: ["No", "Si"],
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                const response = fetch(`${urlBase}/departamentos/${id_departamento}`, {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    credentials: 'include',
                                });
                                swal("Departamento eliminado", {
                                    icon: "success",
                                });
                            } else {
                                swal("Operación cancelada");
                            }
                        });
                } else {
                    swal("Operación cancelada");
                }
            });
    }

    //Cargar los departamentos de la BBDD en la tabla
    const showData = async () => {
        const response = await fetch(`${urlBase}/departamentos`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        setDepartamentos(data);
        setPending(false);
    }

    useEffect(() => {
        showData();
    }, [departamentos])

    //Opciones de la tabla, tema, paginación, columnas...
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

    const columns = [
        {
            keyField: row => row.id_departamento,
            name: "DEPARTAMENTO",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Editar",
            cell: (row) => <button type="button" className="btn btn-primary" onClick={() => submitEditar(row.id_departamento)}><i className="fa-solid fa-pen-to-square"></i></button>,
        }
        ,
        {
            name: "Eliminar",
            cell: (row) => <button type="button" className="btn btn-danger" onClick={() => submitEliminar(row.id_departamento)}><i className="fa-solid fa-trash"></i></button>,
        }
    ]

    return (
        <>
            <div className='contenedorDepartamento'>
                <div className="altaDepartamento">
                    <form id="AltaDepartamentoForm" className="form-signin" onSubmit={submit}>
                        <h1 className="h3 mb-3 font-weight-normal">NUEVO DEPARTAMENTO</h1>
                        <input required maxLength={20} type="text" id="inputDepartamento" className="form-control" placeholder="Departamento" onChange={e => setDepartamento(e.target.value)} /><br />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Crear departamento <i className="fa-solid fa-briefcase"></i></button>
                    </form>
                </div>
                <div className='tablaDepartamentos'>
                    <DataTable
                        columns={columns}
                        data={departamentos}
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
    );
}