import React from 'react'
import gifLoading from '../../images/gifLoading.svg'

const Loading = () => {
    return (
        <>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    {/* <div className="spinner-border ms-auto"></div> */}
                    <img src={gifLoading} alt="Cargando..." />
                </div>
            </div>
        </>
    )
}

export default Loading;