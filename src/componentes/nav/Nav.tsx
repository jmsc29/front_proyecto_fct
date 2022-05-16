import React from 'react';
import NavLogueado from './NavLogueado';
import NavNoLogueado from './NavNoLogueado';

export default function NavBar() {

    return window.localStorage.getItem('user') ?
        (
            <NavLogueado />
        ) :
        (
            <NavNoLogueado />
        )
}