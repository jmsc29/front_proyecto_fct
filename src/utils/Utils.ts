import swal from 'sweetalert';
import swal2 from 'sweetalert2';

export const mostrarCuadroDialogo = function (titulo: string, texto: string, icono: string, tiempo: number) {
    return (
        swal({
            title: titulo,
            text: texto,
            icon: icono,
            buttons: ['Ok'],
            timer: tiempo
        })
    )
}

const toast = swal2.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    //Esto es para que si pongo el ratón por encima del toast, se pare el temporizador del tiempo que está visible
    // didOpen: (toast) => {
    //     toast.addEventListener('mouseenter', swal2.stopTimer)
    //     toast.addEventListener('mouseleave', swal2.resumeTimer)
    // }
})

export const toastLogueado = function () {
    return (toast.fire({
        icon: 'success',
        title: 'Sesión iniciada correctamente'
    })
    )
}

export const toastDesLogueado = function () {
    return (toast.fire({
        icon: 'success',
        title: 'Sesión cerrada correctamente'
    })
    )
}