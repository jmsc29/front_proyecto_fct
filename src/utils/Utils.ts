import swal from 'sweetalert';
import swal2 from 'sweetalert2';

//Clase con distintos tipos de cuadros de diálogos emergentes.
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

export const acercaDe = () => {
    swal("Acerca de", "Aplicación web de control de accesos\nAutor: José María Sáez Castro\nInstituto: IES Trassierra\nCurso: DAM\nAño: 2021/22");
}

const toast = swal2.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,

})

export const toastLogueado = function () {
    return (toast.fire({
        icon: 'success',
        title: 'Sesión iniciada correctamente'
    })
    )
}

export const toastRegistro = function (tipo: string) {
    return (toast.fire({
        icon: 'success',
        title: `Registro de ${tipo} marcado correctamente`
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