import React from 'react';
import "./Home.css"
import img_inicio from "../../../images/imagen_inicio.png";

export default function Home() {

    //PANTALLA DE INICIO
    return (
        <>
            <h1>INFORMACIÓN</h1>
            <div className='contenedorHome'>
                <div className='texto'>
                    <p>La funcionalidad de esta web es la de registrar los movimientos tanto de entrada o salida de los empleados para tener un control lo más exacto posible del tiempo que permanecen en la oficina. Gracias a guardar esta información desde una página web ahorramos mucho en materiales y recuros para así poder destinarlo a otras actividades en las que sean imprescindibles. Esta web no guarda información personal de nadie, simplemente está destinada a mejorar los estándares de seguridad de la empresa.</p>
                </div>
                <div className='imagen'>
                    <img className="imagen_inicio" src={img_inicio} />
                </div>
            </div>
        </>
    )
}