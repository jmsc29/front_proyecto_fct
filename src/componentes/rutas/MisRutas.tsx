import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Ajustes from '../paginas/ajustes/Ajustes'
import Dashboard from '../paginas/dashboard/Dashboard'
import Editar from '../paginas/editar/Editar'
import EditarEspecifico from '../paginas/editar/EditarEspecifico'
import Home from '../paginas/home/Home'
import Login from '../paginas/login/Login'
import Panel from '../paginas/panel/Panel'
import Registro from '../paginas/registro/Registro'
import PrivatesRoutes from './PrivatedRoutes';
import PrivatedRoutesAdmin from './PrivatedRoutesAdmin';
import PublicRoutes from './PublicRoutes'

export const MisRutas = () => (
    <Routes>
        {/*   RUTAS COMUNES (Se puede acceder siempre)   */}
        <Route path="/" element={Home()} />

        {/*   RUTAS PRIVADAS (Sólo se puede acceder si está logueado)   */}
        <Route element={<PrivatesRoutes />}>
            <Route path="/ajustes" element={<Ajustes />} />
            <Route path="/panel" element={<Panel />} />
        </Route>

        {/*   RUTAS PRIVADAS PARA ADMINISTRADOR   */}
        <Route element={<PrivatedRoutesAdmin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/editar" element={<Editar />} />
            <Route path="/editar/:id_usuario" element={<EditarEspecifico />} />
        </Route>

        {/*   RUTAS PÚBLICAS (No se puede acceder si se está logueado)   */}
        <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
        </Route>

        {/*   RUTAS ERRÓNEAS   */}
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
)
