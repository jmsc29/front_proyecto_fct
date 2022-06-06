import React from 'react'
import gifLoading from '../../images/gifLoading.svg'

//GIF en rojo que aparece cuando está cargando la información
const Loading = () => {
    return (
        <>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <img src={gifLoading} alt="Cargando..." />
                </div>
            </div>
        </>
    )
}

export default Loading;