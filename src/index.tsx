import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './componentes/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider> {/*   Contenedor en el cuál almaceno variables que son visibles en todos sus hijos   */}
    <BrowserRouter> {/*   Encargado de permitirme el redireccionamiento de las distintas url   */}
      <CookiesProvider> {/*   Contenedor que se encarga del almacenamiento de las cookies   */}
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </AuthProvider>
);

reportWebVitals();
