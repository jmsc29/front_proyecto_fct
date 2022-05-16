import React, { useContext } from 'react';
import fondoInicio from "../../../images/fondoInicio.jpg";
import "./Home.css"

export default function Home() {

    const miEstilo = {
        backgroundImage: { fondoInicio }
    };

    return (
        <>
            <h1>INICIO</h1>
        </>
    )
}