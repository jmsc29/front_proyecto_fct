import Usuario from "./Usuario";

export default interface Registro{
    id_registro: number,
    fecha: Date,
    hora: Date,
    tipo: string,
    id_usuario: number,
    nombre: string
}