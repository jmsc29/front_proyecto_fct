import Departamento from "./Departamento"

export default interface Usuario{
    id_usuario: number,
    nombre: string,
    apellidos: string,
    nombre_usuario: string,
    telefono: string,
    id_departamento: number,
    departamento: Departamento
    tipo_usuario: string,
    activo: boolean,
    password: string
}