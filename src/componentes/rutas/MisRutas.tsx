import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../paginas/dashboard/Dashboard'
import Home from '../paginas/home/Home'
import Login from '../paginas/login/Login'
import Registro from '../paginas/registro/Registro'
import PrivatesRoutes from './PrivatedRoutes';
import PublicRoutes from './PublicRoutes'

export const MisRutas = () => (
    <Routes>
        <Route path="/" element={Home()} />
        {/*}RUTAS PROTEGIDAS{*/}
        <Route element={<PrivatesRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registro" element={<Registro />} />
        </Route>
        <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/login" element={Login()} />

        {/*<Route path="*" element={<>404 NOT FOUND</>} />*/}
        <Route path="*" element={<Navigate replace to="/" />} /> {/*Uso el replace para que no se quede en el historial de navegación la página que no existe*/}
    </Routes>
)
