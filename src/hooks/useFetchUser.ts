import React, { useEffect, useState } from 'react'
import { urlBase } from '../endpoints';

export const useFetchUser = () => {

    const [nombre, setNombre] = useState('');

    useEffect(() => {
        (
          async () => {
            const response = await fetch(`${urlBase}/user`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            const content = await response.json();
            setNombre(content.nombre);
          }
        )();
      });

      return [nombre, setNombre];
}
