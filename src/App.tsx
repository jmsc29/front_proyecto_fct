import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Nav from './componentes/nav/Nav';
import AuthContext from './componentes/context/AuthContext';
import { MisRutas } from './componentes/rutas/MisRutas';
import Loading from './componentes/loading/Loading';
import Cookies from 'js-cookie';

function App() {

  //usuario en cuestión
  const { setMiUsuario } = useContext(AuthContext);

  const limpiarAlmacenamientoInterno = () => {
    setMiUsuario(null);
    window.localStorage.clear();
    Cookies.remove('jwt');
  }

  //window.onunload = limpiarAlmacenamientoInterno;  --> Este sería al cerrar la pestaña
  //Acción al cerrar el navegador -- limpiar el almacenamiento interno que contiene el usuario
  window.onclose = limpiarAlmacenamientoInterno;

  const { load } = useContext(AuthContext);
  const [loadAux, setLoadAux] = useState();

  useEffect(() => {
    setLoadAux(load);
  }, [load]);

  return (
    <>
      <div className="App">
        {
          load ? (
            <>
              <Nav />
              <MisRutas />
            </>
          ) : <Loading />
        }
      </div>
      <div className='pie'>
        <span><i className="fa-solid fa-user"></i> JMSaez - 2022 - DAM</span>
      </div>
    </>
  );
}

export default App;
