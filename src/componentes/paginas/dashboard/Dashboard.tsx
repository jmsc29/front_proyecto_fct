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

export default function Dashboard() {


    const [empleados, setEmpleados] = useState([]);
    const [registros, setRegistros] = useState([]);

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


    const showData = async () =>{
        const response = await fetch(`${urlBase}/registros`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        
        const data = await response.json();
        console.log(data.content);
        setRegistros(data);
    }

    useEffect(() => {
        showData();
        console.log(registros);
    }, [registros])

    const columns = [
        {
            keyField: row => row.id_registro,
            name: "Nombre",
            selector: row => row.nombre, //row.usuario?.nombre ? row.usuario.nombre : "no",
            sortable: true
        },
        {
            name: "Fecha",
            selector: row => row.fecha,
            sortable: true
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
        }
    ]

    return (
        <>
            <DataTable
                columns = {columns}
                data = {registros}
                pagination
                title = "Registros"
                persistTableHead
                theme="customStyles"
                />
            <br /> <br />
        </>
    )
}