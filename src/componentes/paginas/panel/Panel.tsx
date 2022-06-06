import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../../endpoints';
import { toastRegistro } from '../../../utils/Utils';
import AuthContext from '../../context/AuthContext';
import img_control from "../../../images/control_acceso.jpg";
import './Panel.css'

export default function Panel() {

    const { miUsuario } = useContext(AuthContext);
    const [ultimoRegistro, setUltimoRegistro] = useState<string>();

    const navigate = useNavigate();

    //Al inicio me traigo el usuario en cuestión, es decir, el usuario que ha iniciado sesión y va a realizar el marcaje
    const inicio = async () => {
        const responseAux = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const contentAux = await responseAux.json();


        const response = await fetch(`${urlBase}/registros/ultimo/${contentAux.id_usuario}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            setUltimoRegistro("salida")
        } else {
            try {
                const content = await response.json();
                if (content.tipo) {
                    setUltimoRegistro("entrada");
                } else {
                    setUltimoRegistro("salida");
                }
            } catch {
                setUltimoRegistro("salida")
            }
        }

    };

    inicio();

    //Marcar registro, tanto entrada como salida, los diferencia el booleano 'tipoRegistro', true para las entradas, false para las salidas
    const marcarRegistro = async (tipoRegistro: boolean) => {
        const responseAux = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const contentAux = await responseAux.json();

        const response = await fetch(`${urlBase}/registros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tipo: tipoRegistro,
                id_usuario: contentAux.id_usuario,
                usuario: contentAux.usuario
            })
        });
        const content = await response.json();
        return navigate("/editar");
    }

    //Marcar entrada
    const marcarEntrada = async () => {
        setUltimoRegistro("entrada");
        marcarRegistro(true);
        toastRegistro("entrada");
    }

    //Marcar salida
    const marcarSalida = async () => {
        setUltimoRegistro("salida");
        marcarRegistro(false);
        toastRegistro("salida");
    }

    return (
        <>
            <h2>Bienvenid@ {miUsuario.nombre}</h2>
            <div className='contenedorPanel'>
                <div className='derecha'>
                    <div className='btnRegistro'>
                        {
                            ultimoRegistro == "entrada" ? (
                                <>
                                    <button className="btn btn-danger" onClick={() => marcarSalida()}>Marcar salida <i className="fa-solid fa-door-closed"></i></button>
                                </>
                            ) : ultimoRegistro == "salida" ? (
                                <>
                                    <button className="btn btn-success" onClick={() => marcarEntrada()}>Marcar entrada <i className="fa-solid fa-door-open"></i></button>
                                </>
                            ) :
                                <>
                                    <h6>Calculando el próximo marcaje, por favor espere...</h6>
                                </>
                        }
                    </div>
                    <div className='texto'>
                        <p>Por favor, que no se te olvide registrar tanto tus entradas como tus salidas de la oficina. Insistimos en que es un proceso sumamente necesario para tener un control de todos los empleados y reducir tanto tiempos como recursos. Muchas gracias por entenderlo.</p>
                    </div>
                </div>
                <div className='imagen'>
                    <img className="imagen_panel" src={img_control} />
                </div>
            </div>
        </>
    )
}